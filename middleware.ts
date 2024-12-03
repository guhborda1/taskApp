import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { getUrl } from "./lib/getUrl";

// Configuração de internacionalização
const locales = ["pt-BR", "en"];
const defaultLocale = "en";
const publicPages = ["/", "/auth"];

// Middleware de internacionalização
const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
});

// Middleware principal
export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Regex para identificar páginas públicas
    const publicPathnameRegex = new RegExp(
        `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
        "i"
    );

    // Verifica se é uma página pública
    const isPublicPage = publicPathnameRegex.test(pathname);

    if (isPublicPage) {
        // Aplica middleware de internacionalização para páginas públicas
        return intlMiddleware(req);
    }

    // Verifica o token de sessão usando next-auth
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        // Redireciona para a página de login caso não esteja autenticado
        const signInUrl = getUrl("/auth/");
        return NextResponse.redirect(new URL(signInUrl, req.url));
    }

    // Se autenticado, aplica middleware de internacionalização
    return intlMiddleware(req);
}

// Configuração do matcher
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
