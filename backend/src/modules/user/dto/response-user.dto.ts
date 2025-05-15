import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  profile: {
    profileId: string
    bio: string;
    avatar: string;
    role: number;
  };
}
