"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
    FaCaretDown as DropdownIcon,
    FaSignOutAlt as SignOutIcon
} from "react-icons/fa"
import {
    BsFillFilePersonFill as ProfileIcon
} from "react-icons/bs"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import defaultImage from "../../../../public/default_profile_image.png"

export const Dropdown = () => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const router = useRouter()
    const session = useSession()

    return (
        <>
            <button
                className="flex justify-center items-center gap-2 p-3 hover:bg-buttonBgHover mr-12 rounded-lg"
                onClick={() => setIsOpenDropdown(prev => !prev)}
            >
                <Image
                    src={session.data?.user.user.profilePicture || defaultImage}
                    alt="Imagem de perfil"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <div className="flex gap-1 items-center">
                    <span className="text-white font-bold max-sm:hidden">{session.data?.user.user.name}</span>
                    <DropdownIcon className="text-white" />
                </div>
            </button>
            {
                isOpenDropdown &&
                <div className="absolute top-0 right-0 mt-[5.5rem] mr-12 rounded-lg bg-white w-40 py-2 gap-y-2 shadow-primary flex flex-col items-center">
                    <button
                        className="w-[90%] rounded-lg flex justify-start items-center px-2 bg-dropdownButtonBg hover:bg-dropdownButtonBgHover py-2 gap-2"
                        onClick={() => router.push(`/contributor/${session.data?.user.user.id}`)}
                    >
                        <ProfileIcon />
                        Meu perfil
                    </button>
                    <button
                        className="w-[90%] rounded-lg flex justify-start items-center px-2 bg-dropdownButtonBg hover:bg-dropdownButtonBgHover py-2 gap-2"
                        onClick={() => {
                            signOut({
                                redirect: true,
                                callbackUrl: `${window.location.origin}/`
                            })
                        }}
                    >
                        <SignOutIcon />
                        Sair
                    </button>
                </div>
            }
        </>
    )
}