import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function GET() {

    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.create({
        data: {
            name: 'Code Codero',
            email: 'code@gmail.com',
            password: bcryptjs.hashSync('123456'),
            roles: ['admin', 'client', 'super-su'],
            todos: {
                create: [
                    { description: 'Piedra del alma', complete: true },
                    { description: 'Piedra del poder' },
                    { description: 'Piedra del tiempo' },
                    { description: 'Piedra del espacio' },
                    { description: 'Piedra del realidad' }
                ]
            }
        }
    })

    // await prisma.todo.createMany({
    //     data: [
    //         { description: 'Piedra del alma', complete: true },
    //         { description: 'Piedra del poder' },
    //         { description: 'Piedra del tiempo' },
    //         { description: 'Piedra del espacio' },
    //         { description: 'Piedra del realidad' }
    //     ]
    // })

    return NextResponse.json({
        message: 'Seed executed'
    })
}