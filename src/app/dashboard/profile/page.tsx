"use client"

import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const { data, status } = useSession();


    if (status === 'loading') {
        return <div>
            <h1 className="text-2xl capitalize">{status}</h1>

        </div>

    }


    return (
        <div>
            <h1 className="text-2xl">Profile</h1>
            <div>
                {JSON.stringify(data, null, 2)}
            </div>
        </div>
    );
}