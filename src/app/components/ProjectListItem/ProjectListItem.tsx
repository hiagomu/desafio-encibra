import { ProjectItemProps } from "@/app/@types"
import Image from "next/image"
import { Button } from "../Button"

export const ProjectListItem = ({ projectPicture, name, status, addToProject, isLoading }: ProjectItemProps) => {
    return (
        <li className="flex items-center px-3 py-2 w-full h-16 shadow-primary rounded gap-2">
            <Image
                src={projectPicture || ""}
                alt="Logo do projeto"
                width={48}
                height={48}
                className="rounded max-md:h-8 max-md-w-8"
            />
            <div className="w-full">
                <span className="text-primaryColor font-bold max-md:text-sm">{name}</span>
                <p className="text-secondaryColor font-semibold text-sm max-md:text-xs">{status}</p>
            </div>
            <Button
                type="button"
                title="Alocar"
                disabled={isLoading}
                fn={addToProject}
            />
        </li>
    )
}