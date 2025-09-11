// app/api/2fa/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { proxyJson } from "@/app/lib/bff";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const r = await proxyJson("/2fa/verify", { method: "POST", body: JSON.stringify(body) });
    return NextResponse.json(r.data, { status: r.status });
}
