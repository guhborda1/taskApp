
import type { Metadata } from "next";
import { auth } from "@/services/auth";
import { redirect } from "next/navigation";

import DashboardLayout from "@/app/_components/layout";
import { OrgProvider } from "@/providers/OrgProvider";





export const metadata: Metadata = {
    title: "Dashdoard Panel",
    description: "Nextjs App",
};


export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()
    if (!session?.user) {
        redirect('/auth/')
    }

    return (
        <OrgProvider>
        <DashboardLayout>
            {children}
        </DashboardLayout>
        </OrgProvider>
    );
}
