import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'
import { BookOpen, Bot, ChevronRight, Command, Folder, Frame, LifeBuoy, MoreHorizontal, PieChart, Send, Settings2, Share, SquareTerminal, Trash2, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { DasboardSidebarFooter } from './dasboardSidebarFooter/dasboardSidebarFooter'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export const DashSideBar = ({ paths, pathNames, data, sidebarOpen, setSidebarOpen, currentOrganization, currentTeam, session, router }: any) => {

    return (
        <>
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
                            {data.navMain.map(({ link, index }: any) => {
                                const href = `/${pathNames.slice(0, index + 1).join('/')}`
                                const itemClasses = paths === href ? 'bg-primary-foreground' : ''
                                const itemLink = true ? link.title.toUpperCase() + link.url.slice(1, link.url.length) : link.title
                                return (
                                    <Collapsible
                                        key={link.title}
                                        asChild
                                        defaultOpen={link.isActive}
                                    >
                                        <SidebarMenuItem>
                                            <SidebarMenuButton className={`${itemClasses}`} asChild tooltip={link.title}>
                                                <a href={link.url}>
                                                    <link.icon />
                                                    <span>{link.title}</span>
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
                                                            {link.items?.map(({ subItem, index }: any) => {
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
                        <SidebarGroupLabel>Projects</SidebarGroupLabel>
                        <SidebarMenu>
                            {data.projects.map((item: any) => (
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
                                {data.navSecondary.map(({ link, index }: any) => {
                                    const href = `/${pathNames.slice(0, index + 1).join('/')}`
                                    const itemClasses = paths === href ? 'bg-primary-foreground' : ''
                                    const itemLink = true ? link.title.toUpperCase() + link.url.slice(1, link.url.length) : link.title
                                    return (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuButton className={`${itemClasses}`} asChild size="sm">
                                                <a href={link.url}>
                                                    <link.icon />
                                                    <span>{itemLink}</span>
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
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent side="left" className="w-[280px] sm:w-[340px] p-0">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                    <div className="h-full py-6">
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                                <SidebarMenu>
                                    {data.navMain.map(({ link, index }: any) => {
                                        const href = `/${pathNames.slice(0, index + 1).join('/')}`
                                        const itemClasses = paths === href ? 'bg-primary-foreground' : ''
                                        const itemLink = true ? link.title.toUpperCase() + link.url.slice(1, link.url.length) : link.title
                                        return (
                                            <Collapsible
                                                key={link.title}
                                                asChild
                                                defaultOpen={link.isActive}
                                            >
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton className={`${itemClasses}`} asChild tooltip={link.title}>
                                                        <a href={link.url}>
                                                            <link.icon />
                                                            <span>{link.title}</span>
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
                                                                    {link.items?.map(({ subItem, index }: any) => {
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
                                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                                <SidebarMenu>
                                    {data.projects.map((item: any) => (
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
                                        {data.navSecondary.map(({ link, index }: any) => {
                                            const href = `/${pathNames.slice(0, index + 1).join('/')}`
                                            const itemClasses = paths === href ? 'bg-primary-foreground' : ''
                                            const itemLink = true ? link.title.toUpperCase() + link.url.slice(1, link.url.length) : link.title
                                            return (
                                                <SidebarMenuItem key={index}>
                                                    <SidebarMenuButton className={`${itemClasses}`} asChild size="sm">
                                                        <a href={link.url}>
                                                            <link.icon />
                                                            <span>{itemLink}</span>
                                                        </a>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            )
                                        })}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </div>
                </SheetContent>
            </Sheet></>
    )
}
