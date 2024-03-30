import prisma from '@/lib/prisma';
import { todoSchemaCrete } from '@/validations';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const take = Number(searchParams.get('take')) || 10
    const skip = Number(searchParams.get('skip')) || 0

    if (isNaN(take)) {
        return NextResponse.json({ message: 'Take tiene que ser un número' }, { status: 422 })
    }

    if (isNaN(skip)) {
        return NextResponse.json({ message: 'Skip tiene que ser un número' }, { status: 422 })
    }


    const todos = await prisma.todo.findMany({ take, skip, orderBy: { updatedAt: 'desc' } })

    return NextResponse.json(todos);
}


export async function POST(req: Request) {
    try {

        const body = await req.json();
        const { description, complete } = await todoSchemaCrete.validate(body)


        const todo = await prisma.todo.create({ data: { description, complete } })

        return NextResponse.json(todo, { status: 201 });
    } catch (error: any) {
        if (error?.path) {
            console.log(error)

            return NextResponse.json({ errors: { field: error.path, messages: error.errors } }, { status: 422 })
        }
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })

    }
}


