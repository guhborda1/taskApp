import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
    // Extender o modelo de usuário do Prisma
    interface User extends PrismaUser {
        roleId?: string | null;
        stripeCustomerId?: string | null;
        stripeSubscriptionId?: string | null;
        stripeSubscriptionStatus?: string | null;
        stripePriceId?: string | null;
    }

    // Personalizar a interface de sessão
    interface Session extends DefaultSession {
        user: User; // Garantir que a sessão contenha o usuário completo
    }
}

declare module "next-auth/jwt" {
    // Personalizar o payload do JWT
    interface JWT extends DefaultJWT {
        user: User;
    }
}

export type { Account, DefaultSession, Profile, Session, User } from "@auth/core/types";
