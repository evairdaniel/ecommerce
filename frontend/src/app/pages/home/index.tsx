import type { Product } from "@/app/interfaces/product"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { fetchProducts } from '../../api/apiService'
import Header from "./components/Header"
import ProductList from "./components/ProductList"


export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const loadProducts = async () => {
    setLoading(true)
    try {
      const productList = await fetchProducts()
      setProducts(productList)
    } catch (error) {
      console.error('Erro ao carregar os produtos:', error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="justify-center">
      <Header />
      <h1 className="text-2xl font-bold p-5 text-center">Lista de Produtos</h1>
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
        </div>
      ) : (
        <div className=" justify-center items-center">
          <ProductList products={products.filter(prod => prod.quantity > 0)} />
        </div>
      )}
    </div>
  );
}