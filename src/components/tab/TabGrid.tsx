"use client"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { TabItem } from "./TabItem"

type Props = {
    tabs?: number[]
    currentTab?: number
}

export const TabGrid: FC<Props> = ({ tabs = [1, 2, 3, 4, 5, 6], currentTab = 1 }) => {

    const router = useRouter();

    const [tabSelected, setTabSelected] = useState(currentTab);

    const setTab = (tab: number) => {
        setTabSelected(tab)
        setCookie('tab', tab.toString())
        router.refresh();
    }

    return (
        <div className="flex mt-4">
            <nav className="flex space-x-2 bg-slate-300 p-4 rounded-lg" >
                {
                    tabs.map(tab => <TabItem
                        key={tab} tab={tab} selected={tabSelected} setTab={setTab} />)
                }
            </nav>
        </div>

    )
}
