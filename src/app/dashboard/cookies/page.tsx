import { TabGrid } from "@/components";
import { cookies } from "next/headers";

export default function CookiesPage() {
    const cookie = cookies();
    const tab = Number(cookie.get('tab')?.value ?? '1')
    return (
        <div>
            <h1 className="text-2xl">Cookie page</h1>
            <TabGrid currentTab={tab} />
        </div>
    );
}