// app/api/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { proxyJson } from "@/app/lib/bff";

export async function GET(req: NextRequest) {
    try {
        console.log("[BFF] 🔄 ユーザー情報取得開始");
        
        const cookieHeader = req.headers.get("cookie") || "";
        const headers = Object.fromEntries(req.headers.entries());
        console.log("[BFF] 📝 リクエストヘッダー:", headers);
        console.log("[BFF] 🍪 受信したクッキー:", cookieHeader);

        // sq_tokenの抽出
        const sqTokenMatch = cookieHeader.match(/sq_token=([^;]+)/);
        if (!sqTokenMatch) {
            console.warn("[BFF] ⚠️ sq_tokenが見つかりません");
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const r = await proxyJson("/auth/me", {
            method: "GET",
            forwardCookie: true,
            headers: {
                "Cookie": `sq_token=${sqTokenMatch[1]}`
            }
        });

        console.log("[BFF] 📥 Backend response:", {
            ok: r.ok,
            status: r.status,
            data: r.data
        });

        if (!r.ok) {
            console.error("[BFF] ❌ User info fetch failed:", r);
            const errorMessage = typeof r.data === 'object' && r.data && 'detail' in r.data
                ? r.data.detail
                : "Unauthorized";
            return NextResponse.json(
                { error: errorMessage },
                { status: r.status }
            );
        }

        const response = NextResponse.json(r.data, {
            status: 200,
            headers: {
                "Cache-Control": "no-store",
                "Pragma": "no-cache"
            }
        });

        console.log("[BFF] ✅ User info fetch successful");
        return response;

    } catch (error) {
        console.error("[BFF] ❌ Error in user info fetch:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
