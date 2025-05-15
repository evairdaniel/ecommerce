

import type { Product } from "@/app/interfaces/product"
import { useCart } from "@/app/provider/cartProvider"
import FallbackImage from "@/components/FallbackImage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCallback, useState } from "react"

type ProductListProps = {
  products: Product[]
}


export default function ProductList({ products }: ProductListProps) {
  const { addProduct } = useCart()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [searchQuery, setSearchQuery] = useState("")


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setTimeout(() => filterProducts(e.target.value), 300)
  }

  const filterProducts = useCallback((q: string) => {
    let filtered = [...products]
    if (q) {
      const query = q.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.id.toLowerCase().includes(query),
      )
    }
    setFilteredProducts(filtered)
  }, [products])




  return (
    <>
      <div className="flex justify-center">
        <Input className="w-6/12" type="text" placeholder="Pesquisar..." value={searchQuery}
          onChange={handleSearchChange} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">


        {filteredProducts.map((product) => (
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
    </>
  )
}