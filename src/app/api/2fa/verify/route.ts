// app/api/2fa/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { proxyJson } from "@/app/lib/bff";

export async function POST(req: NextRequest) {
    try {
        console.log("[BFF] 2FA verification request received");
        const body = await req.json();
        console.log("[BFF] Verification body:", body);
        
        const r = await proxyJson("/2fa/verify", { 
            method: "POST", 
            body: JSON.stringify(body)
        });
        console.log("[BFF] Verification response:", r);
        
        return NextResponse.json(r.data, { status: r.status });
    } catch (error) {
        console.error("[BFF] Error in 2FA verification:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
