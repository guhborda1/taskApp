
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import { createStripeCustomer } from "./services/stripe"


import Resend from "next-auth/providers/resend"
const isDevelopment = process.env.NODE_ENV === 'development'; // Verifica se está no ambiente de desenvolvimento

// Configuração do Resend

// Configuração do Nodemailer

export default {
    providers: [GoogleProvider(
        {
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string
        }
    ),
    Resend({
        from: "gustavo@mrtsolar.com.br",
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
        async jwt({ token, user }) {
            // Adicionar businessId no token se o usuário tiver um negócio associado


            return token
        },
    }
} satisfies NextAuthConfig