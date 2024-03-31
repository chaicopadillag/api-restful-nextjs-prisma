import prisma from "@/lib/prisma";
import { getAuthUser } from "@/server-actions";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {


    try {
        const authUser = await getAuthUser();
        if (!authUser) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        await prisma.todo.deleteMany({ where: { complete: true, userId: authUser.id } })

        return NextResponse.json({ message: 'Delete todos completed' }, { status: 200 });
    } catch (error: any) {
        console.log(error)

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })

    }
}