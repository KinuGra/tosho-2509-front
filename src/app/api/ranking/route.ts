// app/api/ranking/route.ts
import { NextRequest, NextResponse } from "next/server";
import { proxyJson } from "@/app/lib/bff";

export async function GET(_req: NextRequest) {
    const r = await proxyJson("/ranking", { method: "GET" });
    return NextResponse.json(r.data, { status: r.status });
}