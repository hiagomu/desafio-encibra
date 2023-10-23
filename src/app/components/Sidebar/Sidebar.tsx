"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    FaUsers as CollaboratorIcon,
    FaFolderOpen as ProjectsIcon
} from "react-icons/fa"

export const Sidebar = () => {
    const path = usePathname()

    return (
        <div className="bg-sidebarBg flex flex-col w-[14rem] py-10 max-md:w-[10rem] max-sm:w-full max-sm:py-0">
            <Link
                href="/home"
                className={`
                    flex py-5 px-10 gap-2 hover:bg-sidebarBgSelected max-md:py-3 max-md:px-4
                    items-center
                    ${path === "/home" ? "bg-sidebarBgSelected" : "bg-transparent"}
                `}
            >
                <CollaboratorIcon className="text-white w-6 h-6 hover:text-white max-md:w-4 max-md:h-4" />
                <span className="font-bold text-white hover:text-white max-md:text-sm">Colaboradores</span>
            </Link>
            <Link
                href="/projects"
                className={`
                    flex py-5 px-10 gap-2 hover:bg-sidebarBgSelected max-md:py-3 max-md:px-4
                    items-center
                    ${path === "/projects" ? "bg-sidebarBgSelected" : "bg-transparent"}
                `}
            >
                <ProjectsIcon className="text-white w-6 h-6 max-md:w-4 max-md:h-4" />
                <span className="font-bold text-white max-md:text-sm">Projetos</span>
            </Link>
        </div>
    )
}