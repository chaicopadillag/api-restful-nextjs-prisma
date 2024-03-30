"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, ReactNode } from 'react';

export type SidebarItemType = {
    title: string;
    path: string;
    icon: ReactNode
}

export const SidebarItem: FC<SidebarItemType> = ({ icon, path, title }) => {
    const url = usePathname()

    return (
        <li>
            <Link href={path} className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white ${url === path ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}>
                {icon}
                <span className="group-hover:text-white">{title}</span>
            </Link>
        </li>
    )
}
