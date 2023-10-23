import Image from "next/image"
import { Button } from "../Button"
import { useRouter } from "next/navigation"
import { ProjectCardProps, RemoveOfProjectProps } from "@/app/@types"
import { formatDatePattern } from "@/app/utils/formatDatePattern"
import { api } from "../../../../services/api"
import { useMutation, useQueryClient } from "react-query"
import { useSession } from "next-auth/react"

export const ProjectCard = ({
    id,
    name,
    platforms,
    deadline,
    projectPicture,
    setIsMoveProjectModalOpen,
    setProjectId,
    memberId
}: ProjectCardProps) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const session = useSession()
    const isAdmin = session.data?.user.user.roles.includes("gestor")

    const { mutate: removeMember } = useMutation(
        async (props: RemoveOfProjectProps) => {
            await api.delete("/api/members", {
                data: {
                    projectId: props.projectId,
                    userId: props.userId
                }
            })
        },
        {
            onSuccess: () => queryClient.invalidateQueries("userDetails"),
            onError: (err) => console.log(err)
        }
    )

    return (
        <div className={`bg-white px-6 py-5 rounded-xl shadow-primary w-[25rem]
            ${isAdmin ? "min-h-[13.5rem] max-md:min-h-[11rem]" : "min-h-[11rem]"}
            h-fit max-md:w-[20rem] max-md:py-3 max-md:px-4`}
        >
            <div className="flex gap-5 justify-start items-center mb-1">
                <Image
                    alt="Imagem de perfil"
                    src={projectPicture}
                    width={50}
                    height={50}
                    className="rounded-full w-[50px] h-[50px] max-md:w-[40px] max-md:h-[40px]"
                />
                <div>
                    <span className="font-bold text-xl max-md:text-lg">{name}</span>
                    <p className="font-semibold text-secondaryColor  max-md:text-sm">{status}</p>
                </div>
            </div>
            <div className="flex flex-col mb-2">
                <span className="text-secondaryColor text-base font-bold max-md:text-sm">
                    Prazo: {formatDatePattern(new Date(deadline))}
                </span>
                <span className="text-secondaryColor text-base font-bold max-md:text-sm">Plataformas:</span>
                <div className="flex gap-1">
                    {platforms.map((platform, index) =>
                        <div
                            key={index}
                            className="rounded-lg text-secondaryColor border border-secondaryColor
                            px-2 py-0.5 font-bold bg-secondaryBg text-sm max-md:text-xs max-md:px-1"
                        >
                                {platform}
                        </div>    
                    )}
                </div>
            </div>
            {
                isAdmin &&
                <div className="flex justify-between">
                    {
                        setProjectId && setIsMoveProjectModalOpen ?
                        <Button
                            fn={() => {
                                setProjectId(id)
                                setIsMoveProjectModalOpen(true)
                            }}
                            title="Alocar colaborador"
                            type="button"
                        />
                        : memberId &&
                        <Button
                            fn={() => removeMember({
                                projectId: id,
                                userId: memberId}
                            )}
                            title="Sair do projeto"
                            type="button"
                            remove
                        />
                    }
                    <Button fn={() => router.push(`/project/${id}`)} title="Mais detalhes" type="button" />
                </div>
            }
        </div>
    )
}