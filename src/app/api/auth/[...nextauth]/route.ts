import prisma from "@/lib/prisma";
import { getUserByEmailAndPassoword } from "@/server-actions";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "email", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await getUserByEmailAndPassoword(credentials?.username!, credentials?.password!)

                return user;
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user, account, email, profile, credentials }) {
            console.log({ signIn: { user, account, email, profile, credentials } })
            return true
        },
        async jwt({ account, token, user, profile }) {

            console.log({ jwt: { account, token, user, profile } })

            const userDb = await prisma.user.findUnique({ where: { email: token.email! } })

            if (userDb?.isActive === false) {
                throw new Error('User no active')
            }

            token.roles = userDb?.roles ?? ['client'];
            token.id = userDb?.id || 'no-uuid'
            return token
        },
        async session({ session, token, user }) {
            console.log({
                session: { session, token, user }
            })

            if (session && session.user) {
                session.user.roles = token.roles;
                session.user.id = token.id
            }

            return session;
        }
    }
};



const authHandler = NextAuth(authOptions)



export { authHandler as GET, authHandler as POST };
