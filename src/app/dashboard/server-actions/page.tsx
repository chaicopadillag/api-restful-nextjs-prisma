export const dynamic = 'force-dynamic'
export const revalidate = 0

import { CreateTodo, TodoGridActionServer } from "@/components";
import prisma from "@/lib/prisma";

export default async function ServerActionsPage() {
    const todos = await prisma.todo.findMany()
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