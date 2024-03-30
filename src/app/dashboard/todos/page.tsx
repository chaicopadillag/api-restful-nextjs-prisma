export const dynamic = 'force-dynamic'
export const revalidate = 0

import { CreateTodo, TodoGrid } from "@/components";
import prisma from "@/lib/prisma";

export default async function RestTodoPage() {

    const todos = await prisma.todo.findMany()
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