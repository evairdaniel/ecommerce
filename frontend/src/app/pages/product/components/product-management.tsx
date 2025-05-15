"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProductTable from "./product-table"
import ProductDialog from "./product-dialog"
import DeleteConfirmDialog from "./delete-confirm-dialog"
import type { Product } from "@/app/interfaces/product"
import { createProduct, deleteProduct, fetchProducts, updateProduct } from "@/app/api/apiService"
import { toast } from "sonner"

export default function ProductManagement() {

    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>()
    const [searchQuery, setSearchQuery] = useState("")

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null)


    const filterProducts = () => {
        let filtered = [...products]


        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(query) ||
                    product.id.toLowerCase().includes(query),
            )
        }


        setFilteredProducts(filtered)
    }


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        setTimeout(filterProducts, 300)
    }



    const loadProducts = async () => {
        try {
            const productList = await fetchProducts();
            setProducts(productList);
            setFilteredProducts(productList);
        } catch (error) {
            console.error('Erro ao carregar os produtos:', error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleCreateProduct = async (product: Product) => {

        try {
            await createProduct(product);
            toast.success("Produto cadastrado com sucesso!")


            loadProducts();
            setIsCreateDialogOpen(false)
        } catch (error) {
            toast.error("Erro ao cadastrar produto!");
            setIsCreateDialogOpen(false)
        }


    }


    const handleUpdateProduct = async (updatedProduct: Product) => {
        try {
            const updatedProducts = products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))

            await updateProduct(updatedProduct);
            toast.success("Produto alterado com sucesso!")
            setProducts(updatedProducts)
            setFilteredProducts(updatedProducts)
            setIsEditDialogOpen(false)
            setCurrentProduct(null)
        } catch (error) {
            toast.error("Erro ao alterar produto!");
            setIsEditDialogOpen(false)
            setCurrentProduct(null)
        }
    }


    const handleDeleteProduct = async () => {
        try {
            if (!currentProduct) return

            const updatedProducts = products.filter((product) => product.id !== currentProduct.id)

            await deleteProduct(currentProduct.id);
            toast.success("Produto excluído com sucesso")
            setProducts(updatedProducts)
            setFilteredProducts(updatedProducts)
            setIsDeleteDialogOpen(false)
            setCurrentProduct(null)
        } catch (error) {
            toast.error("Erro ao excluir produto.");
            setIsDeleteDialogOpen(false)
            setCurrentProduct(null)
        }
    }


    const openEditDialog = (product: Product) => {
        setCurrentProduct(product)
        setIsEditDialogOpen(true)
    }


    const openDeleteDialog = (product: Product) => {
        setCurrentProduct(product)
        setIsDeleteDialogOpen(true)
    }



    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Filtros</CardTitle>
                    <CardDescription>Filtre os produtos por nome</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <Input
                                placeholder="Buscar produtos..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Lista de Produtos</h2>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Produto
                </Button>
            </div>

            <ProductTable products={filteredProducts || []} onEdit={openEditDialog} onDelete={openDeleteDialog} />

            <ProductDialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
                onSubmit={handleCreateProduct}
                title="Adicionar Produto"
            />

            {currentProduct && (
                <ProductDialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                    onSubmit={handleUpdateProduct}
                    title="Editar Produto"
                    product={currentProduct}
                />
            )}

            {currentProduct && (
                <DeleteConfirmDialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                    onConfirm={handleDeleteProduct}
                    title="Excluir Produto"
                    description={`Tem certeza que deseja excluir o produto "${currentProduct.name}"? Esta ação não pode ser desfeita.`}
                />
            )}
        </div>
    )
}
