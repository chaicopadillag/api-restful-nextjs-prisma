import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';
import { getServerSession } from "next-auth";

export const getUserByEmailAndPassoword = async (email: string, password: string) => {

    try {
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            const newUser = await createUser(email, password);
            return newUser;

        }

        if (!bcryptjs.compareSync(password, user.password ?? '')) {
            return null;
        }

        return user;

    } catch (error) {
        return null;
    }

};


const createUser = async (email: string, password: string) => {

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: bcryptjs.hashSync(password),
                name: email.split('@')[0]
            }
        });

        return user;

    } catch (error) {
        return null;
    }

}

export const getAuthUser = async () => {
    const authUser = await getServerSession(authOptions);
    return authUser?.user

};
