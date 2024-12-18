

import { db } from '@/lib/prisma';
import { verifyToken } from '@/lib/sessions';
import { cookies } from 'next/headers';


export async function getUser() {
    const sessionCookie = (await cookies()).get('session');
    if (!sessionCookie || !sessionCookie.value) {
        return null;
    }

    const sessionData = await verifyToken(sessionCookie.value);
    if (
        !sessionData ||
        !sessionData.user ||
        typeof sessionData.user.id !== 'number'
    ) {
        return null;
    }

    if (new Date(sessionData.expires) < new Date()) {
        return null;
    }
    try {
        const user = await db.user.findUnique({
            where: {
                id: sessionData.user.id
            }
        })

        if (!user) {
            return null;
        }

        return user;
    }
    catch (error) {
        throw new Error('Something Wrong happend')
    }
}


export async function getUserWithTeam(userId: string) {
    const result = await db.user.findUnique({
        where: {
            id: userId
        }, include: { teamMemberships: true }
    })
    return result;
}

export async function getActivityLogs() {
    const user = await getUser();
    if (!user) {
        throw new Error('User not authenticated');
    }

    return await db.activityLog.findMany({
        where: {
            userId: user.id
        }
    })

}

export async function getTeamForUser(userId: string) {
    const result = await db.teamMember.findMany({ where: { userId: userId }, include: { user: true, team: true } })
    console.log(result)
    return result || null;
}