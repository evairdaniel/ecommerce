
export interface Order {
  orderId: string
  userId: string
  userName: string
  total: number
  products: ProductOrder[]
}

export interface ProductOrder {
  productId: string
  productName: string
  unitPrice: number
  quantity: number
  total: number
}

export interface ProductCart{
   productId: string
   quantity: number
}

export interface CreateOrderDto {
  userId: string;
  products: ProductCart[]
}