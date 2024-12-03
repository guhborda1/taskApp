import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { type User } from "@prisma/client";

declare module "next-auth"
{
    interface Session {
        user:
        {
            id: string
            name: string
            email: string
            image?: string
            roleId: string
            stripeCustomerId: string | null;
            stripeSubscriptionId: string | null;
            stripeSubscriptionStatus: string | null;
            stripePriceId: string | null;
        }
    }

    interface User {
        id: string
        name: string
        email: string
        image?: string
        roleId: string
        stripeCustomerId: string | null;
        stripeSubscriptionId: string | null;
        stripeSubscriptionStatus: string | null;
        stripePriceId: string | null;
    }

}
declare module "next-auth/jwt" {
    interface JWT {
        user: User
    }
}
export type {
    Account,
    DefaultSession,
    Profile,
    Session,
    User,
} from "@auth/core/types"