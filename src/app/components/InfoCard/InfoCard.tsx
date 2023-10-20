import Image from "next/image"
import { Button } from "../Button"
import { useRouter } from "next/navigation"

interface Contributor {
    contributor: {
        id: number
        name: string
        profile_picture: string
        age: number,
        main_role: string,
        roles: string[],
        start_date: Date
        contract_type: "CLT" | "PJ"
        is_admin: boolean
        alocated_projects: number[]
    }
}

export const InfoCard = ({ contributor }: Contributor) => {
    const router = useRouter()

    return (
        <div className="bg-white px-6 py-5 rounded-xl shadow-primary w-[25rem] h-[13.25rem]">
            <div className="flex gap-5 justify-start items-center mb-1">
                <Image
                    alt="Imagem de perfil"
                    src={contributor.profile_picture}
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div>
                    <span className="font-bold text-xl">{contributor.name}</span>
                    <p className="font-semibold text-secondaryColor">{contributor.main_role}</p>
                </div>
            </div>
            <div className="flex flex-col mb-2">
                <span className="text-secondaryColor text-base font-bold">Data de Contratação: {String(contributor.start_date)}</span>
                <span className="text-secondaryColor text-base font-bold">Áreas de atuação:</span>
                <div className="flex gap-1">
                    {contributor.roles.map(role =>
                        <div className="rounded-lg text-secondaryColor border border-secondaryColor px-2 py-0.5 font-bold bg-secondaryBg text-sm">{role}</div>    
                    )}
                </div>
            </div>
            <div className="flex justify-between">
                <Button fn={() => {}} title="Alocar colaborador" type="button" />
                <Button fn={() => router.push(`/contributor/${contributor.id}`)} title="Mais detalhes" type="button" />
            </div>
        </div>
    )
}