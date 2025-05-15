import { createOrder } from "@/app/api/apiService"
import type { CreateOrderDto } from "@/app/interfaces/order"
import { useCart } from "@/app/provider/cartProvider"
import FallbackImage from "@/components/FallbackImage"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import Header from "../home/components/Header"

export default function CartPage() {
  const navigate = useNavigate();
  const { products, removeProduct, updateProductQuantity } = useCart();

  const calcularSubtotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0)
  }

  const calcularTotal = () => {
    return calcularSubtotal()
  }
  const handleFinalizeOrder = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user") || "null");

      const orderPayload: CreateOrderDto = {
        userId: user.id,
        products: products.map((p) => ({
          productId: p.id,
          quantity: p.quantity,
        })),
      }
      await createOrder(orderPayload)
      toast.success("Pedido realizado sucesso!")
      localStorage.removeItem("cartProducts")
      navigate('/home')
    } catch (error) {
      toast.error("Erro ao realizar pedido.")
      console.error("rro ao realizar pedido.", error)
    }
  }
  return (
    <div>
      <Header />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Meu Carrinho</h1>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-4">
            {products.length > 0 ? (
              products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-32 h-32">

                        <FallbackImage
                          src=''
                          alt={product.name}
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">R$ {(product.price * product.quantity).toFixed(2)}</div>
                            <div className="text-sm text-muted-foreground">R$ {product.price.toFixed(2)} cada</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Diminuir quantidade" onClick={() => {
                              if (product.quantity - 1 == 0) {
                                removeProduct(product.id);
                                return;
                              }
                              updateProductQuantity(product.id, product.quantity - 1)
                            }
                            }>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{product.quantity}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Aumentar quantidade" onClick={() => updateProductQuantity(product.id, product.quantity + 1)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => removeProduct(product.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remover
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Seu carrinho está vazio</h3>
                <p className="text-muted-foreground mb-6">
                  Parece que você ainda não adicionou nenhum produto ao seu carrinho
                </p>
                <Button asChild>
                  <Link to="/home">Continuar comprando</Link>
                </Button>
              </div>
            )}
          </div>


          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R$ {calcularSubtotal().toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>R$ {calcularTotal().toFixed(2)}</span>
                  </div>
                  <Button className="w-full mt-4" size="lg" onClick={handleFinalizeOrder}>
                    Finalizar Compra
                  </Button>
                  <div className="text-center text-sm text-muted-foreground mt-4">
                    <p>ou</p>
                    <Link to="/home" className="underline hover:text-foreground">
                      Continuar Comprando
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
