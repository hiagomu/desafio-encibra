"use client"

import Image from "next/image"
import React, { useState } from "react"
import { Button } from "../Button"
import { ContributorProps } from "@/app/@types"
import { FieldInfo } from "../FieldInfo/FieldInfo"
import { formatDatePattern } from "@/app/utils/formatDatePattern"
import { api } from "../../../../services/api"
import { useRouter } from "next/navigation"
import { useMutation } from "react-query"
import { EditUserModal } from "../EditUserModal"
import { calcAge } from "@/app/utils/calcAge"
import { checkRole } from "@/app/utils/checkRole"

export const ContributorDetails = ({
    id,
    name,
    email,
    roles,
    contractType,
    profilePicture,
    mainRole,
    birthDate,
    startDate
} : ContributorProps) => {
    const [isNewMemberModalOpen, setIsNewMemberModalOpen] = useState(false)
    const router = useRouter()
    const isAdmin = checkRole()

    const { mutate: deleteMember, isLoading: isRemovingMember } = useMutation(
        async () => {
            await api.delete(`/api/users/${id}`)
        },
        {
            onSuccess: () => router.push("/home") 
        }
    )

    return (
        <div className="w-[24rem] max-h-[49rem] shadow-primary bg-white
            rounded-lg flex flex-col items-center py-5 max-md:w-[20rem]"
        >
            <EditUserModal
                onClose={() => setIsNewMemberModalOpen(false)}
                isOpen={isNewMemberModalOpen}
                member={{
                    id,
                    name,
                    email,
                    roles,
                    contractType,
                    profilePicture,
                    mainRole,
                    birthDate,
                    startDate
                }}
            />
            <Image
                alt="Foto de perfil"
                src={profilePicture}
                width={64}
                height={64}
                className="rounded-full mb-2 h-[64px] w-[64px]"
            />
            <span className="text-xl font-bold">{name}</span>
            <span className="font-semibold text-labelText">{mainRole}</span>
            <FieldInfo title="Nome completo" value={name} />
            <FieldInfo title="Data de nascimento" value={formatDatePattern(new Date(birthDate))} />
            <FieldInfo title="Data de ínicio" value={formatDatePattern(new Date(startDate))} />
            { isAdmin && <FieldInfo title="Regime de contratação" value={contractType} />}
            <FieldInfo title="Idade" value={calcAge(new Date(birthDate))} />
            <div className="w-[17rem] h-10 mb-4">
                <h3 className="text-labelText font-bold mb-1">Funções</h3>
                <div className="flex gap-2">
                    {roles.map((role, index) =>
                        <div
                            className="rounded-lg text-secondaryColor border border-secondaryColor px-2 py-0.5 font-bold bg-secondaryBg text-sm"
                            key={index}
                        >
                            {role}
                        </div>
                    )}
                </div>
            </div>
            {
                isAdmin &&
                <div className="mt-2 w-full flex justify-evenly">
                    <Button
                        type="button"
                        fn={() => setIsNewMemberModalOpen(true)}
                        disabled={isRemovingMember}
                        title="Editar"
                    />
                    <Button
                        type="button"
                        fn={deleteMember}
                        disabled={isRemovingMember}
                        title="Remover"
                        remove
                    />
                </div>
            }
        </div>
    )
}