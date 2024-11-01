
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/prisma"
import { Adapter } from "next-auth/adapters"
import authConfig from "@/auth.config"
export const {
    auth,
    handlers,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        newUser: '/dashboard'
    },
    adapter: PrismaAdapter(db) as Adapter,
    // providers: [Google, EmailProvider()],
    secret: process.env.SECRET,
    ...authConfig,


    // callbacks: {
    //     async session({ session, user }) {
    //         session.user = { ...session.user, id: user.id, role: user.role } as {
    //             id: string;
    //             name: string;
    //             email: string;
    //             role: string;
    //         };
    //         return session;
    //     },
    // },
})
