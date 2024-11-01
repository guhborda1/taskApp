export { auth as middleware } from "@/services/auth"
import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/getUrl'
export default function middleware(req: NextRequest) {
    const token = req.cookies.get('authjs.session-token')
    const pathname = req.nextUrl.pathname
    console.log({
        token: token?.value,
        pathname,
    })
    if (pathname === '/auth/signin' && token) {
        return NextResponse.redirect(new URL(getUrl('/')))
    }
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
