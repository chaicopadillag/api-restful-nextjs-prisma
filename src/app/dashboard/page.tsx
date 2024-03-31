import { WidgetItem } from "@/components";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {

    const authSession = await getServerSession(authOptions);

    const session = authSession as Session;
    if (!session) {
        return;
    }

    return (
        <div className="grid gap-6 grid-cols-1">
            <WidgetItem title={session.user?.name!} subTitle={""} label={session.user?.email!} text={session.user?.image!} />

        </div>
    );
}