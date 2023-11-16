import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateAuxCutDto {
  @ApiProperty({
    example: 1,
    description: 'Id do corte',
    required: false,
    readOnly: true
  })
  id?: bigint

  @ApiProperty({
    example: 'Picanha',
    description: 'Nome do corte',
    required: true
  })
  @IsNotEmpty({
    message: 'Nome do corte é obrigatório'
  })
  @IsString({
    message: 'Nome do corte precisa ser uma string'
  })
  nome: string

  @ApiProperty({
    example: 'Descrição do corte',
    description: 'Descrição do corte',
    required: false
  })
  @IsString({
    message: 'Descrição do corte precisa ser uma string'
  })
  descricao?: string

  @ApiProperty({
    example: 'Brasil',
    description: 'País em que o corte se apresentado',
    required: true
  })
  @IsNotEmpty({
    message: 'País do corte é obrigatório'
  })
  @IsString({
    message: 'País do corte precisa ser uma string'
  })
  pais: string

  @ApiProperty({
    example: 'pt-BR',
    description: 'Código do idioma em que o corte se apresentado',
    required: true
  })
  @IsNotEmpty({
    message: 'Código do idioma do corte é obrigatório'
  })
  @IsString({
    message: 'Código do idioma do corte precisa ser uma string'
  })
  codigo_idioma: string

  @ApiProperty({
    example: 1,
    description: 'Numero do corte',
    required: true
  })
  @IsNotEmpty({
    message: 'Numero do corte é obrigatório'
  })
  @IsNumber({})
  img_id_mask: number

  @ApiProperty({
    example: 'corte.png',
    description: 'Imagem pequena que represente o corte',
    required: false
  })
  @IsString({
    message: 'Imagem pequena do corte precisa ser uma string'
  })
  img_p_path?: string

  @ApiProperty({
    example: 'corte.png',
    description: 'Imagem grande que represente o corte',
    required: false
  })
  @IsString({
    message: 'Imagem grande do corte precisa ser uma string'
  })
  img_g_path?: string
}

export class CutOutput {
  constructor(cut: any) {
    this.id = cut.id
    this.nome = cut.nome
    this.descricao = cut.descricao
    this.pais = cut.pais
    this.codigo_idioma = cut.codigo_idioma
    this.img_id_mask = cut.img_id_mask
    this.img_p_path = cut.img_p_path
    this.img_g_path = cut.img_g_path
  }

  readonly id?: bigint
  readonly nome: string
  readonly descricao?: string
  readonly pais: string
  readonly codigo_idioma: string
  readonly img_id_mask: number
  readonly img_p_path?: string
  readonly img_g_path?: string
}
