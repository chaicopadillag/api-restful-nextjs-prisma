export const dynamic = 'force-dynamic'
export const revalidate = 0

import { CreateTodo, TodoGrid } from "@/components";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/server-actions";
import { redirect } from "next/navigation";

export default async function RestTodoPage() {

    const authUser = await getAuthUser();

    if (!authUser) {
        return redirect('/api/auth/signin')
    }
    const todos = await prisma.todo.findMany({ where: { userId: authUser.id } })
    return (
        <div>
            <h1 className="text-2xl">Lista de tareas</h1>
            <div className="w-full px-3 mx-5 mb-4">
                <CreateTodo />
            </div>
            <TodoGrid todos={todos} />
        </div>
    );
}