
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { createStripeCustomer } from "./services/stripe"


import { db } from "./lib/prisma"

interface userLogin {
    email: string,
    password: string | Promise<string>
}

import bcrypt from 'bcryptjs';

// Hashear a senha
const saltAndHashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Comparar as senhas
const comparePasswords = async (plainPassword: string, hashedPassword: string) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

const getUserFromDb = async ({ email, password }: userLogin) => {
    // Certifique-se de que o password foi resolvido caso seja uma Promise
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
}

export default {
    providers: [
        Google({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const email = String(credentials.email);
                const password = String(credentials.password);

                // Salta e hasheia a senha
                const pwHash = saltAndHashPassword(password);

                // Verifica se o usuário existe
                const user = await getUserFromDb({ email, password: pwHash });

                if (!user) {
                    throw new Error("User not found.");
                }

                return user;
            }

        })
    ],
    events: {

        async createUser(message: any) {
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
        async signIn(message: any) {
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
        async session({ session, user }: any) {
            session.user = { ...session.user, id: user.id, }
            return session;
        },
        // async jwt({ token, user }) {
        //     // Adicionar businessId no token se o usuário tiver um negócio associado


        //     return token
        // },
    }
}
