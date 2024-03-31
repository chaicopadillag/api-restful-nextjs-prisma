import { ItemCard, ShoppinCart } from "@/components";
import { Product, productsData } from "@/helpers";
import { cookies } from "next/headers";


export const metadata = {
    title: 'Carrito de compras',
    description: 'Carrito de compras',
};

type ProductCart = {
    product: Product,
    quantity: number
}


const getProductsInCart = () => {
    const cookieStore = cookies();
    const products = JSON.parse(cookieStore.get('cart')?.value ?? '{}') as { [key: string]: number };

    const productCart: ProductCart[] = [];
    for (const id of Object.keys(products)) {

        const product = productsData.find(p => p.id == id);
        if (product) {
            productCart.push({
                product,
                quantity: products[id]
            })

        }
    }

    return productCart;


}

const calcularTotal = () => {
    const products = getProductsInCart();

    return products.reduce((prev, curr) => {

        let total = curr.product.price * curr.quantity
        total += prev.total
        let quantity = prev.quantity + curr.quantity

        return {
            total,
            quantity
        }

    }, { total: 0, quantity: 0 })
}

export default function CartPage() {


    const products = getProductsInCart();

    const detail = calcularTotal();
    return (
        <div>
            <h2 className="text-2xl">Productos en el carrito</h2>
            <hr className="mb-2" />
            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full sm:w-3/4">
                    {
                        products.map(p => <ItemCard key={p.product.id} {...p} />)
                    }
                </div>
                <ShoppinCart amount={detail.total} quantity={detail.quantity} />

            </div>
        </div>
    );
}