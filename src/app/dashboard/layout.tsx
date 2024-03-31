import { Sidebar, TopMenu } from "@/components";
import { AuthProvider } from "@/context";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
    title: 'Dasboard Todos',
    description: 'My dashboard todos',
};
export default async function DashboardLayout({ children }: { children: React.ReactNode; }) {

    const authSession = await getServerSession(authOptions);

    if (!authSession) {
        redirect('/api/auth/signin')
    }

    return (
        <AuthProvider>
            <Sidebar />
            <div className="ml-auto bg-gray-200 mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
                <TopMenu />
                <div className="px-6 pt-6 bg-white p-2 m-2 pb-4 rounded-lg">
                    {children}
                </div>
            </div>
        </AuthProvider>
    );
}