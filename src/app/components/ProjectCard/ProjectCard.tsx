import Image from "next/image"
import { Button } from "../Button"
import { useRouter } from "next/navigation"
import { ProjectProps } from "@/app/@types"

export const ProjectCard = ({
    id,
    name,
    platforms,
    deadline,
    project_picture
}: ProjectProps) => {
    const router = useRouter()

    return (
        <div className="bg-white px-6 py-5 rounded-xl shadow-primary w-[25rem] h-[13.25rem]">
            <div className="flex gap-5 justify-start items-center mb-1">
                <Image
                    alt="Imagem de perfil"
                    src={project_picture}
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div>
                    <span className="font-bold text-xl">{name}</span>
                    <p className="font-semibold text-secondaryColor">{status}</p>
                </div>
            </div>
            <div className="flex flex-col mb-2">
                <span className="text-secondaryColor text-base font-bold">Prazo: {String(deadline)}</span>
                <span className="text-secondaryColor text-base font-bold">Plataformas:</span>
                <div className="flex gap-1">
                    {platforms.map(platform =>
                        <div className="rounded-lg text-secondaryColor border border-secondaryColor px-2 py-0.5 font-bold bg-secondaryBg text-sm">{platform}</div>    
                    )}
                </div>
            </div>
            <div className="flex justify-between">
                <Button fn={() => {}} title="Alocar colaborador" type="button" />
                <Button fn={() => router.push(`/project/${id}`)} title="Mais detalhes" type="button" />
            </div>
        </div>
    )
}