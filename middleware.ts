import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getUrl } from './lib/getUrl';
import { routing } from './i18n/routing';
import { auth } from './services/auth';

const intlMiddleware = createIntlMiddleware(routing);
const PUBLIC_FILE = /\.(.*)$/;

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('authjs.session-token');
    const pathname = req.nextUrl.pathname;

    console.log({ token: token, path: pathname })
    const session = await auth();
    console.log( 'middlewareSession:', session )
    console.log( 'token:', token )
    // Redirect based on session
    if (pathname === '/auth/' && session?.user) {
        return NextResponse.redirect(new URL(getUrl('/dashboard')));
    }

    if (pathname === '[locale]/dashboard/*' && !session?.user) {
        return NextResponse.redirect(new URL(getUrl('/auth/signin')));
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)', "/dashboard/:path*",], // Adjust the matcher as necessary
};
