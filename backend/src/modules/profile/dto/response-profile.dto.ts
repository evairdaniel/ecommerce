import { ApiProperty } from '@nestjs/swagger';

export class ResponseProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  role: number;
}
