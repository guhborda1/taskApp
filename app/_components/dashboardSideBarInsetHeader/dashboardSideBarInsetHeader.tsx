'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { HomeIcon } from 'lucide-react'
type TBreadCrumbProps = {
    homeElement: React.ReactNode,
    separator: React.ReactNode,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean
}
export const DashboardSideBarInsetHeader = ({ homeElement, separator, containerClasses, listClasses, activeClasses, capitalizeLinks }: TBreadCrumbProps) => {
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    return (
        <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {pathNames.length > 0 && separator}
                        {
                            pathNames.map((link, index) => {
                                let href = `/${pathNames.slice(0, index + 1).join('/')}`
                                let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                                let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                                return (
                                    <React.Fragment key={index}>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink href={href}>
                                                {itemLink}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        {pathNames.length !== index + 1 && separator}
                                    </React.Fragment>
                                )
                            })
                        }
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}
