'use server'
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleTodoAction = async (id: string, complete: boolean) => {

    const existTodo = await prisma.todo.findFirst({ where: { id } });

    if (!existTodo) throw { message: `El todo con el ID ${existTodo} no existe` }

    const todo = await prisma.todo.update({ where: { id }, data: { complete } })
    revalidatePath('/dashboard/server-actions')
    return todo

}

export const addTodoAction = async (description: string) => {
    try {
        const todo = await prisma.todo.create({ data: { description } })
        revalidatePath('/dashboard/server-actions')
        return todo
    } catch (error: any) {

        return { message: 'Internal Server Error' };

    }
}


export const deleteTodoCompletedAction = async () => {

    try {

        await prisma.todo.deleteMany({ where: { complete: true } })

        return { message: 'Delete todos completed' };
    } catch (error: any) {
        console.log(error)

        return { message: 'Internal Server Error' };

    }
}