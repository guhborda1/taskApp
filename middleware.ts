import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getUrl } from './lib/getUrl';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);
const PUBLIC_FILE = /\.(.*)$/;

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('authjs.session-token');
    const pathname = req.nextUrl.pathname;



    // Redirect based on session
    if (pathname === '/auth' && token) {
        return NextResponse.redirect(new URL(getUrl('/dashboard')));
    }

    if (pathname === '/dashboard' && !token) {
        return NextResponse.redirect(new URL(getUrl('/auth')));
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'], // Adjust the matcher as necessary
};
