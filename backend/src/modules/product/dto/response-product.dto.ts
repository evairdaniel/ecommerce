import { ApiProperty } from '@nestjs/swagger';

export class ResponseproductDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;
}
