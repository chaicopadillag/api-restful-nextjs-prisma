import prisma from '@/lib/prisma';
import { getAuthUser } from '@/server-actions';
import { todoSchemaUpdate } from '@/validations';
import { NextResponse } from 'next/server';

type SegmentsType = {
    params: {
        id: string
    }
}

const findTodoExist = async (id: string, userId: string) => {

    const todo = await prisma.todo.findFirst({ where: { id, userId } })
    return todo;
}


export async function GET(request: Request, { params }: SegmentsType) {
    const authUser = await getAuthUser();

    if (!authUser) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }



    const todo = await findTodoExist(params.id, authUser.id)

    if (!todo) {
        return NextResponse.json({
            message: `El todo con el id: ${params.id} no existe`
        }, { status: 404 })
    }


    return NextResponse.json(todo)

}


export async function PUT(req: Request, { params }: SegmentsType) {

    try {
        const authUser = await getAuthUser();
        if (!authUser) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        const existTodo = await findTodoExist(params.id, authUser.id)

        if (!existTodo) {
            return NextResponse.json({
                message: `El todo con el id: ${params.id} no existe`
            }, { status: 404 })
        }

        const body = await req.json();
        const { description, complete } = await todoSchemaUpdate.validate(body)


        const todo = await prisma.todo.update({ where: { id: params.id }, data: { description, complete } })

        return NextResponse.json(todo, { status: 200 });
    } catch (error: any) {
        if (error?.path) {
            console.log(error)

            return NextResponse.json({ errors: { field: error.path, messages: error.errors } }, { status: 422 })
        }
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })

    }
}
