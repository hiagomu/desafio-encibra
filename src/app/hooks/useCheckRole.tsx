import { useSession } from "next-auth/react"

export default function useCheckRole() {
    const session = useSession()
    
    return !!session.data?.user.user.roles.includes("gestor")
}