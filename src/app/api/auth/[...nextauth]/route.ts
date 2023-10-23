import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { prisma } from '../../../../../prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
        credentials: {
            email: {},
            password: {},
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
                return null
            }
            
            const user = await prisma.user.findUnique({
                where: {
                    email: credentials?.email
                }
            });

            if (!user) {
                return null
            }

            const passwordCorrect = await compare(
            credentials.password || '',
                user.password
            );

            if (passwordCorrect) {
                return {
                    id: String(user?.id),
                    email: user?.email,
                };
            }

            return null;
        },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (token.email) {
                const userData = await prisma.user.findUnique({
                    where: {
                    email: token.email
                }
                })

                if (user) {
                    return {
                        user: userData
                    }
                }
    
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    user: token.user
                }
            }
        },
    },
});

export { handler as GET, handler as POST };