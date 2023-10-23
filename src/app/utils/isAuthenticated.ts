import { useSession } from "next-auth/react"

export const isAuthenticated = () => {
    const session = useSession()
    
    if (session.status === "authenticated") return true
    return false
}