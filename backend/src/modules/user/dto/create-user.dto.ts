import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Fulano de tal',
    description: 'Nome completo do usuário',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'fulano@email.com',
    description: 'E-mail do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Senha',
    description: 'Senha com no mínimo 6 caracteres',
  })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'profileId', required: false })
  @IsString()
  @IsOptional()
  profileId?: string;
}
