import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../order/order.schema';
import { OrderProduct, OrderProductDocument } from './order-product.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product, ProductDocument } from '../product/product.schema';
import { ResponseOrderDto } from './dto/response-order.dto';
import { productOrderResponse } from 'src/Common/utils/response-order-product';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(OrderProduct.name)
    private readonly orderProductModel: Model<OrderProductDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateOrderDto): Promise<ResponseOrderDto> {
    const order = new this.orderModel({
      user: dto.userId,
      total: 0,
      products: [],
    });

    let total = 0;
    const orderProductIds = [];

    for (const item of dto.products) {
      const product = await this.productModel.findById(item.productId);
      if (!product || product.quantity < item.quantity) {
        throw new BadRequestException(
          `Produto inválido ou estoque insuficiente: ${item.productId}`,
        );
      }

      const subtotal = product.price * item.quantity;
      total += subtotal;

      product.quantity -= item.quantity;
      await product.save();

      const orderProduct = await this.orderProductModel.create({
        order: order._id,
        product: product._id,
        price: product.price,
        quantity: item.quantity,
      });

      orderProductIds.push(orderProduct._id);
    }

    order.total = total;
    order.products = orderProductIds;
    await order.save();

    const populatedOrder = await this.orderModel
      .findById(order._id)
      .populate({ path: 'products', populate: { path: 'product' } })
      .populate('user');

    return productOrderResponse(populatedOrder);
  }

  async findAll(): Promise<ResponseOrderDto[]> {
    const orders = await this.orderModel
      .find()
      .populate({ path: 'products', populate: { path: 'product' } })
      .populate('user');

    return orders.map(productOrderResponse);
  }

  async findByUser(userId: string): Promise<ResponseOrderDto[]> {
    const orders = await this.orderModel
      .find({ user: userId })
      .populate({ path: 'products', populate: { path: 'product' } })
      .populate('user');

    if (!orders) {
      throw new BadRequestException('Pedidos não encontrados');
    }

    return orders.map(productOrderResponse);
  }

  async findById(id: string): Promise<ResponseOrderDto> {
    const order = await this.orderModel
      .findById(id)
      .populate({ path: 'products', populate: { path: 'product' } })
      .populate('user');

    if (!order) {
      throw new BadRequestException('Pedido não encontrado');
    }

    return productOrderResponse(order);
  }
}
