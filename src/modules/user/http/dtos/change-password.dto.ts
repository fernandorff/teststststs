import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'luiz.fernando@bol.com',
    required: true
  })
  @IsNotEmpty({
    message: 'Email do usuário é obrigatório'
  })
  @IsEmail({}, { message: 'Email do usuário precisa estar no formato de e-mail.' })
  email: string

  @ApiProperty({
    description: 'Senha atual do usuário',
    example: 'SenhaForte1!',
    required: true
  })
  @IsNotEmpty({
    message: 'Senha atual do usuário é obrigatória'
  })
  currentPwd: string

  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'NovaSenhaForte1!',
    required: true
  })
  @IsNotEmpty({
    message: 'Nova senha do usuário é obrigatória'
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
  newPwd: string

  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'NovaSenhaForte1!',
    required: true
  })
  @IsNotEmpty({
    message: 'Nova senha do usuário é obrigatória'
  })
  newPwdConfirm: string
}
