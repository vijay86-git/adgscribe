import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'
import { ROUTES } from '@/lib/routes';

// 1. Specify protected and public routes
const protectedRoutes: string[] = [ROUTES.dashboard];

const publicRoutes: string[] = [ROUTES.signin, ROUTES.signup, '/'];

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // 3. Decrypt the session from the cookie
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    let response: NextResponse;

    // 4. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !session?.token) {
        response = NextResponse.redirect(new URL(ROUTES.signin, req.nextUrl))
    }
    // 5. Redirect to /dashboard if the user is authenticated
    else if (
        isPublicRoute &&
        session?.token &&
        !req.nextUrl.pathname.startsWith(ROUTES.dashboard)
    ) {
        response = NextResponse.redirect(new URL(ROUTES.dashboard, req.nextUrl))
    } else {
        response = NextResponse.next()
    }

    // ✅ Inject the full URL (or path) for server components
    response.headers.set('x-url', req.nextUrl.toString());
    response.headers.set('x-pathname', req.nextUrl.pathname);
    return response;
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}