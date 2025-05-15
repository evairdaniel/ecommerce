

import type { Order } from "@/app/interfaces/order"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { ChevronDown, ChevronUp, Package } from "lucide-react"
import { useState } from "react"

interface OrderItemProps {
  order: Order
}

export default function OrderItem({ order }: OrderItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              Pedido #{order.orderId}
            </CardTitle>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100/80">
            Concluído
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">
              Cliente: <span className="font-medium">{order.userName}</span>
            </p>
          </div>
          <p className="font-medium">{formatCurrency(order.total)}</p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2 flex items-center justify-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <span className="mr-2">Ocultar detalhes</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span className="mr-2">Ver detalhes</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardContent>

      {isExpanded && (
        <>
          <CardContent className="pt-0 border-t">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Itens do pedido</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead className="text-right">Preço unitário</TableHead>
                        <TableHead className="text-right">Quantidade</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.products.map((product) => (
                        <TableRow key={product.productId}>
                          <TableCell className="font-medium">{product.productName}</TableCell>
                          <TableCell className="text-right">{formatCurrency(product.unitPrice)}</TableCell>
                          <TableCell className="text-right">{product.quantity}</TableCell>
                          <TableCell className="text-right">{formatCurrency(product.total)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="pt-2 border-t flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  )
}
