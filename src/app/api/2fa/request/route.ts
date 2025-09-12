// app/api/2fa/request/route.ts
import { NextRequest, NextResponse } from "next/server";
import { proxyJson } from "@/app/lib/bff";

export async function POST(req: NextRequest) {
    try {
        console.log("[BFF] 2FA request received");
        const body = await req.json();
        console.log("[BFF] Request body:", body);
        
        const r = await proxyJson("/2fa/request", { 
            method: "POST", 
            body: JSON.stringify(body)
        });
        console.log("[BFF] Backend response:", r);
        
        return NextResponse.json(r.data, { status: r.status });
    } catch (error) {
        console.error("[BFF] Error in 2FA request:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
