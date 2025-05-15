import Header from "../home/components/Header";
import ProductManagement from "./components/product-management";

export default function ProductPage() {
    return (
        <div>
            <Header />
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6">Gerenciamento de Produtos</h1>
                <ProductManagement />
            </div>
        </div>
    )
}