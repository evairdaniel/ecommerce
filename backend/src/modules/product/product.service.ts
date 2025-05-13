import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { productResponse } from 'src/Common/utils/response-product';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}
  async create(dto: CreateProductDto) {
    try {
      const product = new this.productModel(dto)
      await product.save();
      return productResponse(product);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('E-mail já está em uso');
      }
      throw error;
    }
  }
  async findAll() {
     const users = await this.productModel.find();
    return users.map(productResponse);
   }
 
   async findOne(id: string) {
     const product = await this.productModel.findById(id);
 
     if (!product) {
       throw new NotFoundException('Produto não encontrado');
     }
 
     return productResponse(product);
   }
 
   async update(id: string, dto: UpdateProductDto) {
     const product = await this.productModel.findById(id);
     if (!product) {
       throw new NotFoundException('Produto não encontrado');
     }
 
     product.name = dto.name || product.name;     
     product.price = dto.price || product.price;
     product.quantity = dto.quantity || product.quantity;

     await product.save();
 
     return productResponse(product);
   }
 
    async remove(id: string) {
     const product = await this.productModel.findByIdAndDelete(id);
     return productResponse(product);
   }
}
