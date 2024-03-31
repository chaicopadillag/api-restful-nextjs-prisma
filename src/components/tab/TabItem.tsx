import { FC } from 'react';

export const TabItem: FC<{ tab: number, selected: number, setTab: (i: number) => void }> = ({ tab, selected, setTab }) => {
    return (
        <div
            onClick={() => setTab(tab)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium   border  cursor-pointer leading-5 rounded-md duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:z-10 transition-all ${tab === selected ? 'bg-blue-700 border-blue-700 text-white' : 'bg-white text-gray-800 hover:bg-blue-700 hover:border-blue-700 hover:text-white'}`}>
            {tab}
        </div>
    )
}
