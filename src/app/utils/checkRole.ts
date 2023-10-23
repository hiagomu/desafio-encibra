import { useSession } from "next-auth/react"

export const checkRole = () => {
    const session = useSession()
    return !!session.data?.user.user.roles.includes("gestor")
}