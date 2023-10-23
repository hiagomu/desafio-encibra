"use client"

import Image from "next/image"
import React, { useState } from "react"
import { Button } from "../Button"
import { FieldInfo } from "../FieldInfo/FieldInfo"
import { NewProjectModal } from "../NewProjectModal"
import { formatDatePattern } from "@/app/utils/formatDatePattern"
import { api } from "../../../../services/api"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "react-query"
import { Status } from "../Status"
import { checkRole } from "@/app/utils/checkRole"
import { ContributorProps, ProjectProps } from "@/app/@types"

interface ProjectDetailsProps extends ProjectProps {
    members?: ContributorProps[]
    totalProjects?: number
}

export const ProjectDetails = ({
    id,
    name,
    members,
    description,
    platforms,
    projectPicture,
    contributorsId,
    techs,
    status,
    deadline,
    startDate,
} : ProjectDetailsProps) => {
    const router = useRouter()
    const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)
    const isAdmin = checkRole()

    const { data: allUsers } = useQuery<ContributorProps[]>(
        ["allUsers"],
        async () => {
          const res = await api.get(`/api/users`)
          return res.data.users
        }
      )

    const { mutate: deleteProject, isLoading: isRemovingProject } = useMutation(
        async () => {
            await api.delete(`/api/projects/${id}`)
        },
        {
            onSuccess: () => router.push("/projects") 
        }
    )

    return (
        <div className="w-[24rem] max-h-[40rem] shadow-primary bg-white
            rounded-lg flex flex-col items-center py-5 max-md:w-[20rem]"
        >
            {
                members &&
                <NewProjectModal
                    isOpen={isNewProjectModalOpen}
                    onClose={() => setIsNewProjectModalOpen(false)}
                    members={members}
                    allUsers={allUsers}
                    project={{
                        id: id,
                        name: name,
                        techs: techs,
                        users: members.map(member => ({ userId: member.id })),
                        status: status,
                        deadline: deadline,
                        platforms: platforms,
                        startDate: startDate,
                        description: description,
                        contributorsId: contributorsId,
                        projectPicture: projectPicture,
                    }}
                />
            }
            <Image
                alt="Logo do projeto"
                src={projectPicture}
                width={64}
                height={64}
                className="rounded-full mb-2 h-[64px] w-[64px]"
            />
            <span className="text-xl font-bold">{name}</span>
            <Status status={status}/>
            <FieldInfo title="Nome completo" value={name} />
            <FieldInfo title="Descrição" value={description} />
            <FieldInfo title="Data de ínicio" value={formatDatePattern(new Date(startDate))} />
            <FieldInfo title="Prazo" value={formatDatePattern(new Date(deadline))} />
            <div className="w-[17rem] h-10 mb-4">
                <h3 className="text-labelText font-bold mb-1">Plataformas</h3>
                <div className="flex gap-2">
                    {platforms.map((platform, index) =>
                        <div
                            className="rounded-lg text-secondaryColor border border-secondaryColor px-2 py-0.5 font-bold bg-secondaryBg text-sm"
                            key={index}
                        >
                            {platform}
                        </div>)}
                </div>
            </div>
            <div className="w-[17rem] h-10 mb-4">
                <h3 className="text-labelText font-bold mb-1">Tecnologias</h3>
                <div className="flex gap-2">
                    {techs.map((tech, index) =>
                        <div
                            className="rounded-lg text-secondaryColor border border-secondaryColor px-2 py-0.5 font-bold bg-secondaryBg text-sm"
                            key={index}
                        >
                            {tech}
                        </div>
                    )}
                </div>
            </div>
            {
                isAdmin &&
                <div className="mt-2 w-full flex justify-evenly">
                    <Button
                        type="button"
                        fn={() => setIsNewProjectModalOpen(true)}
                        title="Editar"
                    />
                    <Button
                        type="button"
                        fn={deleteProject}
                        disabled={isRemovingProject}
                        title="Remover projeto"
                        remove
                    />
                </div>
            }
        </div>
    )
}