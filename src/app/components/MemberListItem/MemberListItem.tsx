import { ContributorItemProps } from "@/app/@types"
import Image from "next/image"
import { Button } from "../Button"

export const MemberListItem = ({ profilePicture, name, mainRole, addToProject, isLoading }: ContributorItemProps) => {
    return (
        <li className="flex items-center px-3 py-2 w-full h-16 shadow-primary rounded gap-2">
            <Image
                src={profilePicture || ""}
                alt="Foto de perfil"
                width={48}
                height={48}
                className="rounded max-md:h-8 max-md-w-8"
            />
            <div className="w-full">
                <span className="text-primaryColor font-bold max-md:text-sm">{name}</span>
                <p className="text-secondaryColor font-semibold text-sm max-md:text-xs">{mainRole}</p>
            </div>
            <Button
                type="button"
                disabled={isLoading}
                title="Alocar"
                fn={addToProject}
            />
        </li>
    )
}