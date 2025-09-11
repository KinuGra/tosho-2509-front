import { NextResponse, NextRequest } from "next/server";

const PROTECTED = ["/home", "/simulation", "/result", "/ranking"];

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isProtected = PROTECTED.some((p) => pathname.startsWith(p));

    if (!isProtected) return NextResponse.next();

    const token = req.cookies.get("sq_token")?.value;
    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        url.searchParams.set("redirect", pathname);
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico|api/public).*)"],
};