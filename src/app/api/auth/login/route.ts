// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { proxyJson, getCookieOptions } from "@/app/lib/bff";

export async function POST(req: NextRequest) {
    try {
        console.log("[BFF] Login request received");
        const body = await req.json();
        console.log("[BFF] Login request body:", body);

        const { ok, status, data, headers } = await proxyJson("/auth/login", {
            method: "POST",
            body: JSON.stringify(body),
        });
        console.log("[BFF] Backend login response:", { ok, status, data });

        // エラー時はそのまま返す
        if (!ok) {
            console.error("[BFF] Login failed:", data);
            return NextResponse.json(data, { status });
        }

        // 成功時のレスポンス作成
        const response = NextResponse.json({ 
            message: "ok",
            email: body.email  // 2FAページで使用するためにemailを含める
        });

        // バックエンドのSet-Cookieヘッダーを確認
        const backendCookie = headers.get("set-cookie");
        console.log("[BFF] Backend set-cookie header:", backendCookie);

        // バックエンドのクッキーを転送
        if (backendCookie) {
            response.headers.set("set-cookie", backendCookie);
        }

        // BFF側でもクッキーを設定
        const opts = getCookieOptions();
        response.cookies.set("sq_token", data.access_token, {
            httpOnly: true,
            path: "/",
            secure: opts.secure,
            sameSite: opts.sameSite,
            maxAge: 60 * 60 * 24 * 7  // 1週間
        });

        console.log("[BFF] Login successful, cookie set");
        return response;
    } catch (error) {
        console.error("[BFF] Error in login handler:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
