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
    PlusIcon,
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
    useSidebar,

} from "@/components/ui/sidebar"

import { DashboardSideBarInsetHeader } from './dashboardSideBarInsetHeader/dashboardSideBarInsetHeader'
import { DasboardSidebarFooter } from './dasboardSidebarFooter/dasboardSidebarFooter'

import React, { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useOrgApp } from "@/providers/OrgProvider"


import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ViewVerticalIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslations } from "next-intl"



export interface userDataInterface {
    data: { name: string, email: string, avatar: string },


}
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession()
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)
    const router = useRouter();
    const { currentOrganization, currentTeam } = useOrgApp()
    const t = useTranslations('')

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
            <Sidebar variant="inset">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <a href="#">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <Command className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{currentOrganization?.name || 'CRM Dashboard'}</span>
                                        <span className="truncate text-xs">{currentTeam?.name || 'Team A'}</span>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Platform</SidebarGroupLabel>
                        <SidebarMenu>
                            {data.navMain.map((link, index) => {
                                if (!link || !link.title) {
                                    console.error("Link inválido em navMain:", link);
                                    return null;
                                }
                                const href = `/${pathNames.slice(0, index + 1).join('/')}`
                                const itemClasses = paths === href ? 'bg-primary-foreground' : ''
                                const itemLink = true ? link.title.toUpperCase() + link.url.slice(1, link.url.length) : link.title
                                return (
                                    <Collapsible
                                        key={index}
                                        asChild
                                        defaultOpen={link.isActive}
                                    >
                                        <SidebarMenuItem>
                                            <SidebarMenuButton className={`${itemClasses}`} asChild tooltip={link.title ? link.title : 'M'}>
                                                <a href={link.url}>
                                                    <link.icon />
                                                    <span>{link.title ? link.title : 'M'}</span>
                                                </a>
                                            </SidebarMenuButton>
                                            {link.items?.length ? (
                                                <>
                                                    <CollapsibleTrigger asChild>
                                                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                                                            <ChevronRight />
                                                            <span className="sr-only">Toggle</span>
                                                        </SidebarMenuAction>
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent>
                                                        <SidebarMenuSub>
                                                            {link.items?.map((subItem, index) => {
                                                                const href = `/${pathNames.slice(0, index + 1).join('/')}`
                                                                const itemClasses = paths === href ? 'bg-primary-foreground' : ''
                                                                const itemLink = true ? subItem.title.toUpperCase() + subItem.url.slice(1, subItem.url.length) : subItem.title
                                                                return (
                                                                    <SidebarMenuSubItem key={subItem.title}>
                                                                        <SidebarMenuSubButton asChild>
                                                                            <a href={subItem.url}>
                                                                                <span>{subItem.title}</span>
                                                                            </a>
                                                                        </SidebarMenuSubButton>
                                                                    </SidebarMenuSubItem>
                                                                )
                                                            })}
                                                        </SidebarMenuSub>
                                                    </CollapsibleContent>
                                                </>
                                            ) : null}
                                        </SidebarMenuItem>
                                    </Collapsible>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                        <div className="flex items-center justify-between"><SidebarGroupLabel className="flex justify-between">Projects</SidebarGroupLabel>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild><Button variant='ghost' onClick={(e) => { alert('hey') }}> <PlusIcon size={13} className="" /></Button></TooltipTrigger>
                                    <TooltipContent>
                                        <p>{t("SIDEBAR.ACTIONS.ADD_NEW_PROJECT")}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider></div>
                        <SidebarMenu>
                            {data.projects.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.name}</span>
                                        </a>
                                    </SidebarMenuButton>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuAction showOnHover>
                                                <MoreHorizontal />
                                                <span className="sr-only">More</span>
                                            </SidebarMenuAction>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-48"
                                            side="bottom"
                                            align="end"
                                        >
                                            <DropdownMenuItem>
                                                <Folder className="text-muted-foreground" />
                                                <span>View Project</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Share className="text-muted-foreground" />
                                                <span>Share Project</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Trash2 className="text-muted-foreground" />
                                                <span>Delete Project</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <MoreHorizontal />
                                    <span>More</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup className="mt-auto">
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {data.navSecondary.map((link, index) => {
                                    const href = `/${pathNames.slice(0, index + 1).join('/')}`
                                    const itemClasses = paths === href ? 'bg-primary-foreground' : ''
                                    const itemLink = true ? link.title.toUpperCase() + link.url.slice(1, link.url.length) : link.title
                                    return (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuButton className={`${itemClasses}`} asChild size="sm">
                                                <a href={link.url}>
                                                    <link.icon />
                                                    <span>{link.title ? link.title : 'M'}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <DasboardSidebarFooter />
            </Sidebar>

            <SidebarInset className="w-full relative flex max-h-[95vh] pb-1">
                <div className="sticky top-0 z-10 flex w-full items-center gap-4 border-b bg-background px-6 h-16">

                    <SidebarTrigger><Button>Side</Button></SidebarTrigger>
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


