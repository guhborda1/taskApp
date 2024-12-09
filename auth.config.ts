import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { createStripeCustomer } from "./services/stripe";
import { db } from "./lib/prisma";

interface User {
    id: string;
    name: string;
    email: string;
    password: string | null;
    emailVerified: Date | null;
    image: string | null;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    selectedTeam: string | null;
}

interface UserLogin {
    email: string;
    password: string | Promise<string>;
}

import bcrypt from 'bcryptjs';
import { signInSchema } from "./schema/signInSchema";
import { createSession } from "./lib/sessions";

// Hashear a senha
export const saltAndHashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Comparar as senhas
export const comparePasswords = async (plainPassword: string, hashedPassword: string) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

export const getUserFromDb = async ({ email, password }: { email: string; password: string }) => {
    console.log("Looking for user:", email);
    const user = await db.user.findUnique({
        where: { email },
    });

    if (!user) {
        console.error("User not found with email:", email);
        throw new Error('No account found with this email.');
    }

    if (!user.password) {
        console.error("Password missing for user:", user);
        throw new Error('Account may be linked with Google Provider. Please try logging in with Google.');
    }

    const isPasswordCorrect = await comparePasswords(password, user.password);
    if (!isPasswordCorrect) {
        console.error("Password mismatch for user:", user);
        throw new Error('Incorrect password.');
    }

    console.log("User authenticated:", user);
    return user;
};
export default {
    debug: true,
    providers: [
        Google({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            authorize: async (credentials) => {
                try {


                    const { email, password } = await signInSchema.parse(credentials);

                    // Salta e hasheia a senha
                    // Verifica se o usuário existe
                    const user = await getUserFromDb({ email, password });
                    if (!user) {
                        throw new Error("Error on Execute action");
                    }
                    // Retorne o usuário no formato esperado pelo NextAuth


                    return user
                } catch (error: any) {
                    return error
                }
            }
        })
    ],
    cookies: {
        sessionToken: {
            name: "authjs.session-token",
            options: {
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                secure: true
            }
        }
    },
    events: {
        async createUser(message: any) {

            try {
                if (message.user) {
                    await createStripeCustomer({
                        name: message.user.name as string,
                        email: message.user.email as string,
                    });
                }
            } catch (error) {
                console.error("Error creating Stripe customer:", error);
            }

        },
        async signIn(message: any) {

            try {
                if (message.user) {
                    await createStripeCustomer({
                        name: message.user.name as string,
                        email: message.user.email as string,
                    });
                }
            } catch (error) {
                console.error("Error creating Stripe customer:", error);
            }

        },
    },
    callbacks: {


        async session({ session, token }) {
            console.log("Session Callback - Token recebido:", token);

            if (token.user) {
                session.user = token.user as any;
            }

            console.log("Session Callback - Sessão criada:", session);
            return session;
        },

    }
} satisfies NextAuthConfig;
