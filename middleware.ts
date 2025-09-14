import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'
import { ROUTES } from '@/lib/routes';

// 1. Specify protected and public routes
//const protectedRoutes: string[] = [ROUTES.dashboard, ROUTES.app];
const publicRoutes: string[] = [ROUTES.signin, ROUTES.signup, '/', ROUTES.forgotPassword];

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    //const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // 3. Decrypt the session from the cookie

    const cookieStore = await cookies();
    const encryptedSession = await cookieStore.get('session')?.value;
    const encryptedRole = await cookieStore.get('role')?.value;

    let session: any = null;
    let roleObj: any = null;
    let isError: boolean = false;

    try {
            if (encryptedSession) {
                session = await decrypt(encryptedSession);
            }
            if (encryptedRole) {
                roleObj = await decrypt(encryptedRole);
            }
    } catch (err) {

    }

    // 🧪 Optionally: check that the decrypted session/role have expected structure
    const isSessionValid = typeof session?.token == 'string';
    const isRoleValid = typeof roleObj?.role === 'string';

    // 🔄 Redirect logic
    let response: NextResponse;

    // 🔒 Invalidate and redirect if session or role is missing/invalid
    if ( ! (isSessionValid && isRoleValid)) {
        // const res = NextResponse.redirect(new URL(ROUTES.signin, req.nextUrl));
        // res.cookies.set('session', '', { maxAge: 0 });
        // res.cookies.set('role', '', { maxAge: 0 });
        // return res;
        const response = NextResponse.redirect(new URL(ROUTES.signin, req.nextUrl));
        response.cookies.set('session', '', { maxAge: 0 });
        response.cookies.set('role', '', { maxAge: 0 });
    }

    // const cookie = (await cookies()).get('session')?.value;
    // const roleEncrypt = (await cookies()).get('role')?.value;
    // const roleObj = await decrypt(roleEncrypt);
    // const session = await decrypt(cookie);
    // let response: NextResponse;

    // 4. Redirect to /login if the user is not authenticated
    if (( ! isPublicRoute) && ( ! session?.token)) {
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
        response = NextResponse.next();
    }

    // ✅ Inject the full URL (or path) for server components
    response.headers.set('x-url', req.nextUrl.toString());
    response.headers.set('x-pathname', req.nextUrl.pathname);
    response.headers.set('x-role', roleObj?.role);
    return response;
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}