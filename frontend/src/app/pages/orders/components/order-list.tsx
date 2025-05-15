
import { useState, useEffect } from "react"
import OrderItem from "./order-item"
import type { Order } from "@/app/interfaces/order"

interface OrderListProps {
    filter: string
}

export default function OrderList({ filter }: OrderListProps) {

    const [filteredOrders, setFilteredOrders] = useState<Order[]>([])

    useEffect(() => {
        if (filter === "todos") {
            //setFilteredOrders(mockOrders)
        } else {
            // setFilteredOrders(mockOrders.filter((order) => order.status === filter))
        }
    }, [filter])

    if (filteredOrders.length === 0) {
        return (
            <div className="text-center py-10 bg-muted rounded-lg">
                <p className="text-muted-foreground">Nenhum pedido encontrado.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {filteredOrders.map((order) => (
                <OrderItem key={order.orderId} order={order} />
            ))}
        </div>
    )
}
