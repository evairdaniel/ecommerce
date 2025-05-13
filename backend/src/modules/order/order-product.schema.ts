import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from '../product/product.schema';
import { Order } from './order.schema';

export type OrderProductDocument = OrderProduct & Document;

@Schema()
export class OrderProduct {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order' })
  order: Order;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);
