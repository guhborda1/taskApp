import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/getUrl'
export default function middleware(req: NextRequest) {
    const token = req.cookies.get('authjs.session-token')
    const allCookies = req.cookies.getAll()
    console.log(allCookies)
    const pathname = req.nextUrl.pathname
    console.log({
        token: token?.value,
        pathname,
    })
    if (pathname === '/auth/sigin' && token) {
        return NextResponse.redirect(new URL(getUrl('/dashboard')))
    }
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
