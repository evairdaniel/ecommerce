import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, ArrayNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductOrderDto } from './product-order.dto';

export class CreateOrderDto {
  @ApiProperty({
    example: '60a5f51d5fddc30015c7b69c',
    description: 'ID do usuário',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    type: [ProductOrderDto],
    description: 'Lista de produtos e quantidades',
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDto)
  products: ProductOrderDto[];
}
