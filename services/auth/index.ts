
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
        signIn: '/auth/', signOut: '/auth/', error: '/auth/',
        newUser: '/dashboard'
    },

    adapter: PrismaAdapter(db) as Adapter,

    secret: process.env.SECRET,
    ...authConfig,
})
