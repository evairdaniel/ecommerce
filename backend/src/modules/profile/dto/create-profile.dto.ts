import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateProfileDto {
  @ApiProperty({ example: 'Desenvolvedor' })
  @IsString()  
  @IsOptional()
  bio: string;

  @ApiProperty({ example: 'https://url.com.br/avatar.png' })
  @IsString()
  @IsOptional()
  avatar: string;
    
  @ApiProperty({ example: 1, description: 'Role: 0 for customer, 1 for seller' })
  @IsInt()
  @Min(0)
  @Max(1)
  role: number;
}
