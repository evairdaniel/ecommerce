import { ApiProperty } from '@nestjs/swagger';
import { ResponseProductOrderDto } from './response-product-order.dto';

export class ResponseOrderDto {
  @ApiProperty()
  orderId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  total: number;

  @ApiProperty({ type: [ResponseProductOrderDto] })
  products: ResponseProductOrderDto[];
}
