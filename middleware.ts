import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getUrl } from './lib/getUrl';
import { routing } from './i18n/routing';
import { auth } from './services/auth';


const PUBLIC_FILE = /\.(.*)$/;


export default auth(async (req) => {
    const intlMiddleware = createIntlMiddleware(routing);

    const token = req.cookies.get('authjs.session-token');
    const pathname = req.nextUrl.pathname;
    // Redirect based on session
    if (pathname === '/auth/' && token) {
        return NextResponse.redirect(new URL(getUrl('/dashboard')));
    }

    if (pathname === 'dashboard/*' && !token) {
        return NextResponse.redirect(new URL(getUrl('/auth/signin')));
    }

    return intlMiddleware(req);
})


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)', "/dashboard/:path*",], // Adjust the matcher as necessary
};
