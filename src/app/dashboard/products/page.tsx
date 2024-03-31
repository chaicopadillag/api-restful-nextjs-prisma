import { ProductCard } from "@/components";
import { productsData } from "@/helpers";

export default function ProductsPage() {
    return (
        <div className="grid">
            <h1 className="text-2xl mb-4">Productos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {
                    productsData.map((p) => <ProductCard key={p.id} {...p} />)
                }
            </div>
        </div>
    );
}