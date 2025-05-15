import { ApiProperty } from '@nestjs/swagger';

export class ResponseProductOrderDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  unitPrice: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  total: number;
}
