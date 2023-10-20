import Link from "next/link"
import {
    FaUsers as CollaboratorIcon,
    FaFolderOpen as ProjectsIcon
} from "react-icons/fa"

export const Sidebar = () => {
    return (
        <div className="bg-sidebarBg flex flex-col w-[14rem] py-10">
            <Link
                href="/"
                className="bg-sidebarBgSelected flex py-5 px-10 gap-2 hover:bg-sidebarBgSelected"
            >
                <CollaboratorIcon className="text-white w-6 h-6 hover:text-white" />
                <span className="font-bold text-white hover:text-white">Colaboradores</span>
            </Link>
            <Link
                href="/"
                className="bg-transparent flex py-5 px-10 gap-2  hover:bg-sidebarBgSelected"
            >
                <ProjectsIcon className="text-white w-6 h-6" />
                <span className="font-bold text-white">Projetos</span>
            </Link>
        </div>
    )
}