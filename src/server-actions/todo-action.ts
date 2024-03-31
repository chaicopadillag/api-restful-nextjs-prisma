'use server'
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getAuthUser } from ".";

export const toggleTodoAction = async (id: string, complete: boolean) => {
    const authUser = await getAuthUser();
    if (!authUser) {
        throw { message: 'Unauthorized', status: 401 }
    }

    const existTodo = await prisma.todo.findFirst({ where: { id, userId: authUser.id } });

    if (!existTodo) throw { message: `El todo con el ID ${existTodo} no existe` }

    const todo = await prisma.todo.update({ where: { id }, data: { complete } })
    revalidatePath('/dashboard/server-actions')
    return todo

}

export const addTodoAction = async (description: string) => {
    try {
        const authUser = await getAuthUser();

        if (!authUser) {
            throw { message: 'Unauthorized', status: 401 }
        }
        const todo = await prisma.todo.create({ data: { description, userId: authUser.id } })
        revalidatePath('/dashboard/server-actions')
        return todo
    } catch (error: any) {

        return { message: 'Internal Server Error' };

    }
}


export const deleteTodoCompletedAction = async () => {

    try {
        const authUser = await getAuthUser();
        if (!authUser) {
            throw { message: 'Unauthorized', status: 401 }
        }

        await prisma.todo.deleteMany({ where: { complete: true, userId: authUser.id } })

        return { message: 'Delete todos completed' };
    } catch (error: any) {
        console.log(error)

        return { message: 'Internal Server Error' };

    }
}