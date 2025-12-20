import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from "next/server";

const handleIntl = createMiddleware({
    locales: ['en', 'ar'],
    defaultLocale: 'en'
});

export function middleware(request: NextRequest) {
    // 1. API Auth Protection (exclude from intl)
    if (request.nextUrl.pathname.startsWith('/api')) {
        const jwtToken = request.cookies.get('jwtToken')
        const token = jwtToken?.value as string

        if (!token && request.nextUrl.pathname.startsWith('/api/users/profile')) {
            return NextResponse.json({ message: "Not token provided, access denied" }, { status: 401 });
        }
        return NextResponse.next();
    }

    // 2. Auth Logic for Pages (redirect logged-in users from auth pages)
    const jwtToken = request.cookies.get('jwtToken')
    const token = jwtToken?.value as string

    if (token) {
        if (request.nextUrl.pathname.includes("/login") ||
            request.nextUrl.pathname.includes("/register")) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

    // 3. Run Internationalization Middleware
    const response = handleIntl(request);
    return response;
}

export const config = {
    // Match all pathnames except for:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - images (public images)
    matcher: ['/((?!_next/static|_next/image|favicon.ico|images).*)']
};