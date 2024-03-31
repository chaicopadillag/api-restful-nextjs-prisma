"use client"
import { SessionProvider } from 'next-auth/react'
import { FC, ReactNode } from 'react'

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
