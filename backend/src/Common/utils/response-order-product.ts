import { ResponseOrderDto } from 'src/modules/order/dto/response-order.dto';

export function productOrderResponse(order: any): ResponseOrderDto  {
   const products = order.products.map((op: any) => ({
    productId: op.product._id,
    productName: op.product.name,
    unitPrice: op.price,
    quantity: op.quantity,
    total: op.price * op.quantity,
  }));

 return {
    orderId: order._id,
    userId: order.user._id,
    userName: order.user.name,
    total: order.total,
    products,
  };
}
