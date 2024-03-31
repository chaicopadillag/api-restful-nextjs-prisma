import { FC } from "react";





export const ShoppinCart: FC<{ amount: number, quantity: number }> = ({ amount, quantity }) => {

    const total = (amount * 0.18) + amount;
    const igv = 18;
    return (
        <div className="flex flex-col h-auto px-4 py-6 justify-between overflow-y-auto">
            <div>
                <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 ">Total a pagar</p>
                <div className="flex items-center justify-between pt-16">
                    <p className="text-base leading-none text-gray-800 ">Subtotal</p>
                    <p className="text-base leading-none text-gray-800 ">{amount}</p>
                </div>
                <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800 ">Catidad</p>
                    <p className="text-base leading-none text-gray-800 ">{quantity}</p>
                </div>
                <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800 ">Envio</p>
                    <p className="text-base leading-none text-gray-800 ">Gratis</p>
                </div>
                <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800 ">IGV</p>
                    <p className="text-base leading-none text-gray-800 " >{18}%</p>
                </div>
            </div>
            <div>
                <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                    <p className="text-2xl leading-normal text-gray-800 ">Total</p>
                    <p className="text-2xl font-bold leading-normal text-right text-gray-800 ">$ {total.toFixed(2)}</p>
                </div>
                <button className="text-base leading-none py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700 w-full">Pagar</button>
            </div>
        </div>
    )
}
