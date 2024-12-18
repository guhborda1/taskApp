import { type User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
            role: string;
            stripeCustomerId: string | null;
            stripeSubscriptionId: string | null;
            stripeSubscriptionStatus: string | null;
            stripePriceId: string | null;
        };
    }

    interface User {
        id: string;
        name: string;
        email: string;
        image: string;
        role: string;
        stripeCustomerId: string | null;
        stripeSubscriptionId: string | null;
        stripeSubscriptionStatus: string | null;
        stripePriceId: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: PrismaUser & {
            role: string;
            stripeCustomerId: string | null;
            stripeSubscriptionId: string | null;
            stripeSubscriptionStatus: string | null;
            stripePriceId: string | null;
        };
    }
}

export type {
    Account,
    DefaultSession,
    Profile,
    Session,
    User,
} from "@auth/core/types";
