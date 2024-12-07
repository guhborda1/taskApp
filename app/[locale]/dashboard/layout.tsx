
import type { Metadata } from "next";
import { auth } from "@/services/auth";
import { redirect } from "next/navigation";

import DashboardLayout from "@/app/_components/layout";





export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};


export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()

    if (!session?.user) {
        redirect('/auth')
    }

    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}
