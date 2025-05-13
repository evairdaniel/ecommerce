import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from '../../user/dto/response-user.dto';

export class ResponseLoginDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty({ type: ResponseUserDto })
  user: ResponseUserDto;
}
