// app/lib/bff.ts
import { cookies, headers } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL!;

export function getCookieOptions() {
    const secure = (process.env.COOKIE_SECURE || "false") === "true";
    const sameSite = (process.env.COOKIE_SAMESITE as "lax" | "strict" | "none") || "lax";
    return { secure, sameSite };
}

export async function proxyJson(
    path: string,
    init: RequestInit & { forwardCookie?: boolean } = {}
) {
    try {
        console.log("[BFF Proxy] Making request to:", `${BACKEND_URL}${path}`);
        console.log("[BFF Proxy] Request init:", init);

        const h = new Headers(init.headers || {});
        h.set("content-type", "application/json");
        
        // クッキー処理の改善
        if (init.forwardCookie) {
            try {
                // クッキーの優先順位: 
                // 1. init.headers から直接取得
                // 2. headers() APIからのバックアップ
                let cookieValue = "";

                if (init.headers) {
                    if (init.headers instanceof Headers) {
                        cookieValue = init.headers.get("cookie") || "";
                    } else if (typeof init.headers === "object") {
                        const headers = new Headers(init.headers);
                        cookieValue = headers.get("cookie") || "";
                    }
                }

                if (!cookieValue) {
                    const headersList = await headers();
                    cookieValue = headersList.get("cookie") || "";
                }

                // sq_tokenの抽出と設定
                const sqTokenMatch = cookieValue.match(/sq_token=([^;]+)/);
                if (sqTokenMatch) {
                    h.set("cookie", `sq_token=${sqTokenMatch[1]}`);
                    console.log("[BFF Proxy] 🍪 転送するトークン検出");
                } else {
                    console.warn("[BFF Proxy] ⚠️ 認証トークンが見つかりません");
                }
            } catch (error) {
                console.error("[BFF Proxy] ❌ クッキー処理中のエラー:", error);
            }
        }
        
        console.log("[BFF Proxy] Request headers:", Object.fromEntries(h.entries()));

        const res = await fetch(`${BACKEND_URL}${path}`, {
            ...init,
            headers: h,
            cache: "no-store",
        });
        
        console.log("[BFF Proxy] 📥 レスポンスステータス:", res.status);
        console.log("[BFF Proxy] 📝 レスポンスヘッダー:", Object.fromEntries(res.headers.entries()));

        const responseText = await res.text();
        console.log("[BFF Proxy] 📄 生レスポンス:", responseText);

        let data = {};
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error("[BFF Proxy] ❌ JSONパースエラー:", e);
        }
        console.log("[BFF Proxy] Response data:", data);
        
        return { ok: res.ok, status: res.status, data, headers: res.headers };
    } catch (error) {
        console.error("[BFF Proxy] Error in proxyJson:", error);
        throw error;
    }
}
