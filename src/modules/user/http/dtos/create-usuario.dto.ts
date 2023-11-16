import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Luiz Fernando',
    required: true
  })
  @IsNotEmpty({
    message: 'Nome do usuário é obrigatório'
  })
  @IsString({
    message: 'Nome do usuário precisa ser uma string'
  })
  nome: string

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
    description: 'Idioma do usuário',
    example: 'pt-BR',
    required: true
  })
  @IsNotEmpty({
    message: 'Idioma do usuário é obrigatório'
  })
  @IsString({
    message: 'Idioma do usuário precisa ser uma string'
  })
  idioma: string

  @ApiProperty({
    description: 'ID do grupo de acesso',
    example: '1',
    required: true
  })
  @IsNotEmpty({
    message: 'ID do grupo de acesso é obrigatório'
  })
  grupo_acesso_id: string

  @ApiProperty({
    description: 'País do usuário',
    example: 'Brasil',
    required: true
  })
  @IsNotEmpty({
    message: 'País do usuário é obrigatório'
  })
  @IsString({
    message: 'País do usuário precisa ser uma string'
  })
  pais: string
}
