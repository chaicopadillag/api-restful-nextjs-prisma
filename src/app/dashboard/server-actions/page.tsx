export const dynamic = 'force-dynamic'
export const revalidate = 0

import { CreateTodo, TodoGridActionServer } from "@/components";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/server-actions";
import { redirect } from "next/navigation";

export default async function ServerActionsPage() {
    const authUser = await getAuthUser();

    if (!authUser) {
        return redirect('/api/auth/signin')
    }

    const todos = await prisma.todo.findMany({ where: { userId: authUser.id } })
    return (
        <div>
            <h1 className="text-2xl">Lista de tareas (Server Todos)</h1>
            <div className="w-full px-3 mx-5 mb-4">
                <CreateTodo />
            </div>
            <TodoGridActionServer todos={todos} />
        </div>
    );
}