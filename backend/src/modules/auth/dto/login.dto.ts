import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'usuario@email.com',
    description: 'E-mail do usuário',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha' })
  @IsNotEmpty()
  password: string;
}
