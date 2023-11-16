import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateAuxLanguageDto {
  @ApiProperty({
    example: 1,
    description: 'Id do idioma',
    readOnly: true,
    required: false
  })
  id?: bigint

  @ApiProperty({
    example: 'Brasil',
    description: 'Nome do idioma',
    required: true
  })
  @IsNotEmpty({
    message: 'Nome do idioma é obrigatório'
  })
  @IsString({
    message: 'Nome do idioma deve ser uma string'
  })
  nome_idioma: string

  @ApiProperty({
    example: 'pt-br',
    description: 'Código do idioma',
    required: true
  })
  @IsNotEmpty({
    message: 'Código do idioma é obrigatório'
  })
  @IsString({
    message: 'Código do idioma deve ser uma string'
  })
  codigo_idioma: string

  @ApiProperty({
    example: 'icon.svg',
    description: 'Ícone do idioma',
    required: true
  })
  @IsNotEmpty({
    message: 'Ícone do idioma é obrigatório'
  })
  @IsString({
    message: 'Ícone do idioma deve ser uma string'
  })
  url_icon: string

  @ApiProperty({
    example: 'Breve descrição',
    description: 'Descrição do idioma',
    required: false
  })
  @IsString({
    message: 'Descrição do idioma deve ser uma string'
  })
  descricao?: string

  @ApiProperty({
    example: 1,
    description: 'Ordem de exibição do idioma',
    required: false
  })
  @IsNumber()
  order_exibicao?: number
}
export class AuxLanguageOutput {
  constructor(auxLanguage: any) {
    this.id = auxLanguage.id
    this.nome_idioma = auxLanguage.nome_idioma
    this.codigo_idioma = auxLanguage.codigo_idioma
    this.url_icon = auxLanguage.url_icon
    this.descricao = auxLanguage.descricao
    this.order_exibicao = auxLanguage.order_exibicao
  }

  readonly id?: bigint
  readonly nome_idioma: string
  readonly codigo_idioma: string
  readonly url_icon: string
  readonly descricao?: string
  readonly order_exibicao?: number
}
