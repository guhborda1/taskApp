'use client'


import { usePathname } from 'next/navigation'



import { Session } from 'next-auth'
import { Award, BriefcaseBusinessIcon, ChevronDown, ChevronUp, CreditCard, DogIcon, DollarSign, FileText, Home, HomeIcon, Layers, MenuIcon, PawPrintIcon, SeparatorHorizontal, Settings, SettingsIcon, StarsIcon, Users, UsersIcon, WrenchIcon } from 'lucide-react'



import Image from 'next/image'

import { useState } from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils'

type MainSidebarProps = {
    user: Session['user'],
    links: LinksProps[],
    className?: string

}
interface LinksProps {
    href: string
    icon: React.ReactNode
    label: string
    dropdown?: {
        href: string
        icon: React.ReactNode
        label: string
    }[]
}

export function MainSidebar({ user, links, className }: MainSidebarProps) {
    const pathname = usePathname()
    const isActive = (path: string) => {
        return pathname === path
    }
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)

    // Função que alterna o estado de aberto para o dropdown atual
    const toggleDropdown = (index: number) => {
        if (openDropdownIndex === index) {
            // Se já estiver aberto, feche o dropdown
            setOpenDropdownIndex(null)
        } else {
            // Caso contrário, abra o dropdown
            setOpenDropdownIndex(index)
        }
    }
    return (
        <div className={cn("lg:flex flex-col h-screen w-[350px] bg-white", className)}>
            <div className="p-4 border-b">
                <div className="flex items-center space-x-2">
                    <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                        <Image src="/next.svg" alt="logo" width={50} height={50} />
                        CRM
                    </Link>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto">
                <ul className="p-2 space-y-1">
                    {links.map((item, i) => (
                        <li key={i}>
                            {item.dropdown && item.dropdown.length > 0 ? (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(i)} // Alterne o dropdown atual
                                        className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Layers size={20} />
                                            <span>{item.label}</span>
                                        </div>
                                        {openDropdownIndex === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>
                                    {openDropdownIndex === i && (
                                        <ul className="ml-6 mt-2 space-y-1">
                                            {item.dropdown.map((dropdownItem, j) => (
                                                <li key={j}>
                                                    <Link
                                                        href={dropdownItem.href}
                                                        className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                                                    >
                                                        {dropdownItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <Link href={item.href} className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-md">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>



            <div className="p-4 border-t flex items-center justify-between">
                <div className="flex items-center space-x-2">

                    <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div >
    )
}


