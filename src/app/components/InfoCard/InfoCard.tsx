import Image from "next/image"
import { Button } from "../Button"
import { useRouter } from "next/navigation"
import { roles as rolesData } from "../ContributorDetails/structure"
import { api } from "../../../../services/api"
import { formatDatePattern } from "@/app/utils/formatDatePattern"
import { useMutation, useQueryClient } from "react-query"
import { checkRole } from "@/app/utils/checkRole"
import { ContributorCardProps, RemoveOfProjectProps } from "@/app/@types"

export const InfoCard = ({
    id,
    name,
    roles,
    mainRole,
    startDate,
    project,
    setMemberId,
    profilePicture,
    setIsMoveMemberModalOpen
}: ContributorCardProps) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const isAdmin = checkRole()

    const { mutate: removeOfProject, isLoading: isRemovingProject } = useMutation(
        async (props: RemoveOfProjectProps) => {
            await api.delete("/api/members", {
                data: {
                    userId: props.userId,
                    projectId: props.projectId
                }
            })
        },
        {
            onSuccess: () => queryClient.invalidateQueries("projectDetails")
        }
    )

    return (
        <div className="bg-white px-6 py-5 rounded-xl shadow-primary w-[25rem] h-fit max-md:w-[20rem] max-md:py-3 max-md:px-4">
            <div className="flex gap-5 justify-start items-center mb-1">
                <Image
                    alt="Imagem de perfil"
                    src={profilePicture}
                    width={50}
                    height={50}
                    className="rounded-full w-[50px] h-[50px] max-md:w-[40px] max-md:h-[40px]"
                />
                <div>
                    <span className="font-bold text-xl max-md:text-lg">{name}</span>
                    <p className="font-semibold text-secondaryColor max-md:text-sm">{mainRole}</p>
                </div>
            </div>
            <div className="flex flex-col mb-2">
                <span className="text-secondaryColor text-base font-bold max-md:text-sm">
                    Data de Contratação: {formatDatePattern(new Date(startDate))}
                </span>
                <span className="text-secondaryColor text-base font-bold max-md:text-sm">Áreas de atuação:</span>
                <div className="flex gap-1">
                    {roles.map((role, index) =>
                        <div
                            key={index}
                            className="rounded-lg text-secondaryColor border
                            border-secondaryColor px-2 py-0.5 font-bold bg-secondaryBg text-sm
                            max-md:text-xs max-md:px-1"
                        >
                            {rolesData.find(roleItem => role ===  roleItem.value)?.name}
                        </div>    
                    )}
                </div>
            </div>
            {
                isAdmin &&
                <div className="flex justify-between">
                    {
                        setMemberId && setIsMoveMemberModalOpen &&
                        <Button
                            fn={() => {
                                setMemberId(id)
                                setIsMoveMemberModalOpen(true)
                            }}
                            title="Alocar colaborador"
                            type="button"
                        />
                    }
                    {
                        project &&
                        <Button
                            fn={() =>
                                removeOfProject({
                                    projectId: project.id,
                                    userId: id
                                })
                            }
                            disabled={isRemovingProject}
                            title="Remover colaborador"
                            type="button"
                            remove
                        />
                    }
                </div>
            }
            <Button fn={() => router.push(`/contributor/${id}`)} title="Mais detalhes" type="button" />
        </div>
    )
}