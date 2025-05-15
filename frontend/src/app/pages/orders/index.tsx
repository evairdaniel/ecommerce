import { fetchOrder, fetchOrders } from "@/app/api/apiService"
import type { Order } from "@/app/interfaces/order"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import Header from "../home/components/Header"
import OrdersList from "./components/orders-list"

export default function OrdersPage() {

  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState<Order[]>([])
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const loadOrders = async () => {
    try {

      if (user.profile.role == 0) {
        const orders: Order[] = await fetchOrder(user.id);
        const filtered = orders.filter(order => order.userId === user.id)
        setOrders(filtered);
        setFilter(filtered)
      } else {
        const orders: Order[] = await fetchOrders();
        setOrders(orders);
        setFilter(orders);
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleFilter = (filterValue: string) => {
    if (!filterValue.trim()) {
      setFilter(orders);
      return;
    }

    const filtered = orders.filter(order =>
      order.products.some(product =>
        product.productName.toLowerCase().includes(filterValue.toLowerCase())

      ) || order.orderId.toLowerCase().includes(filterValue.toLowerCase())
      || order.userName.toLowerCase().includes(filterValue.toLowerCase())
    );

    setFilter(filtered);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Meus Pedidos</h1>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar pedidos..." className="pl-8" onChange={e => handleFilter(e.target.value)} />
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
            <CardDescription>Visão geral dos seus pedidos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total de pedidos</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Valor total</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(orders.reduce((acc, order) => acc + order.total, 0))}
                </p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Produtos comprados</p>
                <p className="text-2xl font-bold">{orders.reduce((acc, order) => acc + order.products.length, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <OrdersList orders={filter} />
      </div>
    </div>
  )
}
