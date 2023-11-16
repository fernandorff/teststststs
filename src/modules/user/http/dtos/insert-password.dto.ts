import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'

export class InsertPasswordDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'luiz.fernando@bol.com',
    required: true
  })
  @IsNotEmpty({
    message: 'Email do usuário é obrigatório'
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Password do usuário',
    example: 'P4ssw0rd*F0rt3',
    required: true
  })
  @IsNotEmpty({
    message: 'Password do usuário é obrigatório'
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1
    },
    { message: 'O password deve conter no mínimo 8 caracteres contento minusculos, maiusculos, símbolos e números.' }
  )
  @IsString({
    message: 'Password do usuário precisa ser uma string'
  })
  pwd: string
}
