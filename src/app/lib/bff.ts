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
    const h = new Headers(init.headers || {});
    h.set("content-type", "application/json");
    if (init.forwardCookie) {
        const ck = (await headers()).get("cookie") || "";
        h.set("cookie", ck);
    }
    const res = await fetch(`${BACKEND_URL}${path}`, {
        ...init,
        headers: h,
        cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data, headers: res.headers };
}
