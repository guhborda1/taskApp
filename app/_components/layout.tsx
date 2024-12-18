'use client'
import {

    BookOpen,
    Bot,
    ChevronRight,

    Command,

    Folder,
    Frame,
    HomeIcon,
    LifeBuoy,

    Map,
    MoreHorizontal,
    PieChart,
    Send,
    Settings2,
    Share,

    SquareTerminal,
    Trash2,
    X,
} from "lucide-react"


import {
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    DropdownMenu,
    DropdownMenuContent,

    DropdownMenuItem,

    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Sidebar,
    SidebarContent,

    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarTrigger,

} from "@/components/ui/sidebar"

import { DashboardSideBarInsetHeader } from './dashboardSideBarInsetHeader/dashboardSideBarInsetHeader'
import { DasboardSidebarFooter } from './dasboardSidebarFooter/dasboardSidebarFooter'

import React, { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useOrgApp } from "@/providers/OrgProvider"
import { DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { DashSideBar } from "./dashSideBar"


export interface userDataInterface {
    data: { name: string, email: string, avatar: string },


}
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession()
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)
    const router = useRouter();
    const { currentOrganization, currentTeam } = useOrgApp()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    if (!session?.user)
        router.push('/auth/')
    const data = {
        user: {
            name: session?.user.name,
            email: session?.user.email,
            avatar: session?.user.image || '/next.svg',
        },
        navMain: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: SquareTerminal,
                isActive: true,

            },
            {
                title: "Contatos",
                url: "/dashboard/contatos",
                icon: Bot,
                items: [
                    {
                        title: "Novo Contato",
                        url: "#",
                    },
                    {
                        title: "Contatos ",
                        url: "/dashboard/contatos",
                    },

                ],
            },
            {
                title: "Documentation",
                url: "#",
                icon: BookOpen,
                items: [
                    {
                        title: "Introduction",
                        url: "#",
                    },
                    {
                        title: "Get Started",
                        url: "#",
                    },
                    {
                        title: "Tutorials",
                        url: "#",
                    },
                    {
                        title: "Changelog",
                        url: "#",
                    },
                ],
            },
            {
                title: "Settings",
                url: "#",
                icon: Settings2,
                items: [
                    {
                        title: "General",
                        url: "#",
                    },
                    {
                        title: "Team",
                        url: "#",
                    },
                    {
                        title: "Billing",
                        url: "#",
                    },
                    {
                        title: "Limits",
                        url: "#",
                    },
                ],
            },
        ],
        navSecondary: [
            {
                title: "Support",
                url: "#",
                icon: LifeBuoy,
            },
            {
                title: "Feedback",
                url: "#",
                icon: Send,
            },
        ],
        projects: [
            {
                name: "Design Engineering",
                url: "#",
                icon: Frame,
            },
            {
                name: "Sales & Marketing",
                url: "#",
                icon: PieChart,
            },
            {
                name: "Travel",
                url: "#",
                icon: Map,
            },
        ],
    }
    return (

        <SidebarProvider>
            <DashSideBar session={session} paths={paths} pathNames={pathNames} router={router} currentOrganization={currentOrganization} currentTeam={currentTeam} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <SidebarInset className="w-full relative flex max-h-[95vh] pb-1">
                <div className="sticky top-0 z-10 flex w-full items-center gap-4 border-b bg-background px-6 h-16">
                    <SidebarTrigger onClick={() => setSidebarOpen(true)} className="md:hidden" />
                    <DashboardSideBarInsetHeader
                        homeElement={<HomeIcon size={12} />}
                        separator={<BreadcrumbSeparator className="hidden md:block" />}
                        activeClasses='font-bold'
                        containerClasses=''
                        listClasses='text-black mx-2'
                        capitalizeLinks
                    />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-screen overflow-y-scroll">
                    <main className="w-full mx-auto py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>



    )
}


