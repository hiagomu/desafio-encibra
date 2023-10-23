import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth/next"
import { prisma } from "../../../../prisma/client"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
            email: {
                label: 'Email',
                type: 'email',
                placeholder: 'email@exemplo.com'
                },
            password: {
                label: "Password",
                type: "password"
            }
            },
            async authorize(credentials, req) {
            const res = await fetch("/your/endpoint", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()
            if (res.ok && user) {
                return user
            }
            return null
            }
        })
    ]
}

export default NextAuth(authOptions)