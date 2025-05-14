import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Max, Min } from "class-validator";

export class CreateProfileDto {
  @ApiProperty({ example: 'Desenvolvedor' })
  @IsString()
  bio: string;

  @ApiProperty({ example: 'https://url.com.br/avatar.png' })
  @IsString()
  avatar: string;
    
  @ApiProperty({ example: 1, description: 'Role: 0 for customer, 1 for seller' })
  @IsInt()
  @Min(0)
  @Max(1)
  role: number;
}
