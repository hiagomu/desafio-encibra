import { ProjectItemProps } from "@/app/@types"
import Image from "next/image"
import { Button } from "../Button"

export const ProjectListItem = ({ project_picture, name, status, addToProject }: ProjectItemProps) => {
    return (
        <li className="flex px-3 py-2 w-full h-16 shadow-primary rounded gap-2">
            <Image
                src={project_picture || ""}
                alt="Logo do projeto"
                width={48}
                height={48}
                className="rounded"
            />
            <div className="w-full">
                <span className="text-primaryColor font-bold">{name}</span>
                <p className="text-secondaryColor font-semibold text-sm">{status}</p>
            </div>
            <Button
                type="button"
                title="Alocar"
                fn={addToProject}
            />
        </li>
    )
}