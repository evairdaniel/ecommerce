"use client"

import type { Product } from "@/app/interfaces/product";
import { useCart } from "@/app/provider/cartProvider";
import FallbackImage from "@/components/FallbackImage";
import { Button } from "@/components/ui/button";

type ProductListProps = {
  products: Product[];
};


export default function ProductList({ products }: ProductListProps) {
  const { addProduct } = useCart();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-2xl shadow-sm p-4 hover:shadow-md transition duration-300"
        >
          <FallbackImage
            src=''
            alt={product.name}
          />
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-blue-600 font-bold text-sm">R$ {product.price.toFixed(2)}</p>
            </div>
            <div>
              <Button className="bg-blue-600 cursor-pointer" onClick={() => addProduct(product)}>Adicionar ao carrinho</Button>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}