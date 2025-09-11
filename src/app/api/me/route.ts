// app/api/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { proxyJson } from "@/app/lib/bff";

export async function GET(_req: NextRequest) {
    const r = await proxyJson("/auth/me", { method: "GET", forwardCookie: true });
    return NextResponse.json(r.data, { status: r.status });
}
