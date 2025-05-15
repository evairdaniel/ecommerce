import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';
import { OrderProduct } from './order-product.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  total: number;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'OrderProduct' }],
  })
  products: OrderProduct[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
