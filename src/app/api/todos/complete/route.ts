import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {

    try {

        await prisma.todo.deleteMany({ where: { complete: true } })

        return NextResponse.json({ message: 'Delete todos completed' }, { status: 200 });
    } catch (error: any) {
        console.log(error)

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })

    }
}