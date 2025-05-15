import type { Order } from "@/app/interfaces/order"
import OrderItem from "./order-item"

interface OrdersListProps {
    orders: Order[]
}

export default function OrdersList({ orders }: OrdersListProps) {
    return (
        <div className="space-y-4">
            {orders.length === 0 ? (
                <div className="text-center py-10 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Você ainda não realizou nenhum pedido.</p>
                </div>
            ) : (
                orders.map((order) => <OrderItem key={order.orderId} order={order} />)
            )}
        </div>
    )
}
