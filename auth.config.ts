
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import { createStripeCustomer } from "./services/stripe"
import Credentials from "next-auth/providers/credentials"
import { db } from "./lib/prisma"
import { signInSchema } from "./schema/signInSchema"
import { ZodError } from "zod"
import bcrypt from 'bcryptjs'
import User from "next-auth"
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
    providers: [GoogleProvider(
        {
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string
        }
    ),
    Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
            email: {},
            password: {},
        },
        authorize: async (credentials, req) => {
            try {
                if (!credentials) throw new Error("Missing credentials");

                const { email, password } = await signInSchema.parseAsync(credentials)

                // logic to salt and hash password
                const pwHash = saltAndHashPassword(password)

                // logic to verify if the user exists
                const user = await getUserFromDb({ email, password })

                if (!user) {
                    throw new Error("Invalid credentials");
                }

                // Retornar o usuário diretamente (conforme a interface `User`)
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.roleId,
                    stripeCustomerId: user.stripeCustomerId,
                    stripeSubscriptionId: user.stripeSubscriptionId,
                    stripeSubscriptionStatus: user.stripeSubscriptionStatus,
                    stripePriceId: user.stripePriceId,
                };
            } catch (error) {
                if (error instanceof ZodError) {
                    // Return `null` to indicate that the credentials are invalid
                    return null
                }
            }
        },
    }),

    ],
    events: {

        async createUser(message) {
            // Only proceed if the user is newly created (i.e., sign-up)
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
        async signIn(message) {
            // Only proceed if the user is newly created (i.e., sign-up)
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
        async session({ session, user }) {
            session.user = { ...session.user, id: user.id, }
            return session;
        },
        // async jwt({ token, user }) {
        //     // Adicionar businessId no token se o usuário tiver um negócio associado


        //     return token
        // },
    }
} satisfies NextAuthConfig