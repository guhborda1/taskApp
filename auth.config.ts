import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
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

// Hashear a senha
const saltAndHashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Comparar as senhas
const comparePasswords = async (plainPassword: string, hashedPassword: string) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

const getUserFromDb = async ({ email, password }: UserLogin): Promise<User | null> => {
    const resolvedPassword = await password;

    const userExist = await db.user.findUnique({
        where: { email: email }
    });

    if (userExist) {
        // Verifique se as senhas coincidem
        if (userExist.password) {
            const isPasswordCorrect = await comparePasswords(resolvedPassword, userExist.password);
            if (isPasswordCorrect) {
                return userExist;
            }
        }
    }

    return null;
};

export default {
    providers: [
        Google({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            authorize: async (credentials) => {
                const { email, password } = await signInSchema.parse(credentials);

                // Salta e hasheia a senha
                const pwHash = await saltAndHashPassword(password);

                // Verifica se o usuário existe
                const user = await getUserFromDb({ email, password: pwHash });

                if (!user) {
                    throw new Error("User not found.");
                }

                // Retorne o usuário no formato esperado pelo NextAuth
                return null
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
            if (message.user) {
                try {
                    await createStripeCustomer({
                        name: message.user.name as string,
                        email: message.user.email as string,
                    });
                } catch (error) {
                    console.error("Error creating Stripe customer:", error);
                }
            }
        },
        async signIn(message: any) {
            if (message.user) {
                try {
                    await createStripeCustomer({
                        name: message.user.name as string,
                        email: message.user.email as string,
                    });
                } catch (error) {
                    console.error("Error creating Stripe customer:", error);
                }
            }
        },
    },
    callbacks: {
        async session({ session, user }: any) {
            session.user = { ...session.user, id: user.id };
            return session;
        },
    }
} satisfies NextAuthConfig;
