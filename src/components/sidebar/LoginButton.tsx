"use client"
import { signIn } from 'next-auth/react'
import { CiLogin } from 'react-icons/ci'

export const LoginButton = () => {
    return (
        <button
            onClick={() => signIn()}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group bg-white">
            <CiLogin />
            <span className="group-hover:text-gray-700">Login</span>
        </button>
    )
}
