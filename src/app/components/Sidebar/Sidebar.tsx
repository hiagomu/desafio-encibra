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
        <div className="bg-sidebarBg flex flex-col w-[14rem] py-10">
            <Link
                href="/"
                className={`
                    flex py-5 px-10 gap-2 hover:bg-sidebarBgSelected
                    ${path === "/" ? "bg-sidebarBgSelected" : "bg-transparent"}
                `}
            >
                <CollaboratorIcon className="text-white w-6 h-6 hover:text-white" />
                <span className="font-bold text-white hover:text-white">Colaboradores</span>
            </Link>
            <Link
                href="/projects"
                className={`
                    flex py-5 px-10 gap-2 hover:bg-sidebarBgSelected
                    ${path === "/projects" ? "bg-sidebarBgSelected" : "bg-transparent"}
                `}
            >
                <ProjectsIcon className="text-white w-6 h-6" />
                <span className="font-bold text-white">Projetos</span>
            </Link>
        </div>
    )
}