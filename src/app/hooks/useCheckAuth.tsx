import { useSession } from "next-auth/react"

export default function useCheckAuth() {
    const session = useSession()

    if (session.status === "authenticated") return true
    return false
}