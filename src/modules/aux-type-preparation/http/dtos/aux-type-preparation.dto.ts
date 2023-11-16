import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAuxTypePreparationDto {
  @ApiProperty({
    example: 1,
    description: 'Id do tipo de preparo',
    readOnly: true,
    required: false
  })
  id?: bigint

  @ApiProperty({
    example: 'pt-br',
    description: 'Código do idioma do tipo de preparo',
    required: true
  })
  @IsNotEmpty({
    message: 'Código do idioma do tipo de preparo é obrigatório'
  })
  @IsString({
    message: 'Código do idioma do tipo de preparo deve ser uma string'
  })
  codigo_idioma: string

  @ApiProperty({
    example: 'Fritar',
    description: 'Nome do tipo de preparo',
    required: true
  })
  @IsNotEmpty({
    message: 'Nome do tipo de preparo é obrigatório'
  })
  @IsString({
    message: 'Nome do tipo de preparo deve ser uma string'
  })
  nome: string

  @ApiProperty({
    example: 'Breve descrição',
    description: 'Descrição do tipo de preparo',
    required: false
  })
  @IsString({
    message: 'Descrição do tipo de preparo deve ser uma string'
  })
  descricao?: string

  @ApiProperty({
    example: 'Texto adicional',
    description: 'Texto adicional do tipo de preparo',
    required: false
  })
  @IsString({
    message: 'Texto adicional do tipo de preparo deve ser uma string'
  })
  texto_1?: string

  @ApiProperty({
    example: 'image.png',
    description: 'Imagem pequena que represente o tipo de preparo',
    required: false
  })
  @IsString({
    message: 'Imagem pequena do tipo de preparo precisa ser uma string'
  })
  img_p_path?: string

  @ApiProperty({
    example: 'image.png',
    description: 'Imagem grande que represente o tipo de preparo',
    required: false
  })
  @IsString({
    message: 'Imagem grande do tipo de preparo precisa ser uma string'
  })
  img_g_path?: string
}

export class AuxTypePreparationOutput {
  constructor(type: any) {
    this.id = type.id
    this.codigo_idioma = type.codigo_idioma
    this.nome = type.nome
    this.descricao = type.descricao
    this.texto_1 = type.texto_1
    this.img_p_path = type.img_p_path
    this.img_g_path = type.img_g_path
  }

  readonly id?: bigint
  readonly codigo_idioma: string
  readonly nome: string
  readonly descricao?: string
  readonly texto_1?: string
  readonly img_p_path?: string
  readonly img_g_path?: string
}
