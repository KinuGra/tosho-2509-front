// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { proxyJson, getCookieOptions } from "@/app/lib/bff";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { ok, status, data } = await proxyJson("/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
    });

    if (!ok) return NextResponse.json(data, { status });

    // FastAPI もSet-Cookieするが、BFF側でも 3000 ドメインでCookieを発行
    const opts = getCookieOptions();
    cookies().set("sq_token", data.access_token, {
        httpOnly: true,
        path: "/",
        secure: opts.secure,
        sameSite: opts.sameSite,
    });

    return NextResponse.json({ message: "ok" });
}
