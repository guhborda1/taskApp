import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getUrl } from './lib/getUrl';
import { routing } from './i18n/routing';
import { auth } from './services/auth';
import { getTeamForUser, getUser } from './prisma/queries';
import { redirect } from 'next/navigation';
import { Team, User } from '@prisma/client';
import { z } from 'zod';

const intlMiddleware = createIntlMiddleware(routing);
const PUBLIC_FILE = /\.(.*)$/;

export type ActionState = {
    error?: string;
    success?: string;
    [key: string]: any; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
    data: z.infer<S>,
    formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
    schema: S,
    action: ValidatedActionFunction<S, T>
) {
    return async (prevState: ActionState, formData: FormData): Promise<T> => {
        const result = schema.safeParse(Object.fromEntries(formData));
        if (!result.success) {
            return { error: result.error.errors[0].message } as T;
        }

        return action(result.data, formData);
    };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
    data: z.infer<S>,
    formData: FormData,
    user: User
) => Promise<T>;

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
    schema: S,
    action: ValidatedActionWithUserFunction<S, T>
) {
    return async (prevState: ActionState, formData: FormData): Promise<T> => {
        const user = await getUser();
        if (!user) {
            throw new Error('User is not authenticated');
        }

        const result = schema.safeParse(Object.fromEntries(formData));
        if (!result.success) {
            return { error: result.error.errors[0].message } as T;
        }

        return action(result.data, formData, user);
    };
}

type ActionWithTeamFunction<T> = (
    formData: FormData,
    team: Team
) => Promise<T>;

export function withTeam<T>(action: ActionWithTeamFunction<T>) {
    return async (formData: FormData): Promise<T> => {
        const user = await getUser();
        if (!user) {
            redirect('/sign-in');
        }

        const team = await getTeamForUser(user.id);
        if (!team) {
            throw new Error('Team not found');
        }

        return action(formData, team);
    };
}
export default auth(async (req) => {
    const token = req.cookies.get('authjs.session-token');
    const pathname = req.nextUrl.pathname;
    const session = await auth();

    console.log({ token: token, path: pathname })

    // Redirect based on session
    if (pathname === '/auth/' && token) {
        return NextResponse.redirect(new URL(getUrl('/dashboard')));
    }

    if (pathname === '[locale]/dashboard/*' && token) {
        return NextResponse.redirect(new URL(getUrl('/auth/signin')));
    }

    return intlMiddleware(req);
})


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)', "/dashboard/:path*",], // Adjust the matcher as necessary
};
