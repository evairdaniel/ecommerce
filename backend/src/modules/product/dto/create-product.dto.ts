import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Notebook',
    description: 'Nome do produto',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1200.00',
    description: '1200.00',
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: '1200.00',
    description: '1200.00',
  })
  @IsNotEmpty()
  quantity: number;
}
