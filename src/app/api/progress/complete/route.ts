// app/api/progress/complete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { proxyJson } from "@/app/lib/bff";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const r = await proxyJson("/progress/complete", {
        method: "POST",
        body: JSON.stringify(body),
        forwardCookie: true, // ← sq_token をFastAPIへ渡す
    });
    return NextResponse.json(r.data, { status: r.status });
}
