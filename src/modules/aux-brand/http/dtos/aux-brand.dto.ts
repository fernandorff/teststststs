import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAuxBrandDto {
  @ApiProperty({
    description: 'Id da marca',
    example: 1,
    readOnly: true,
    required: false
  })
  id?: bigint

  @ApiProperty({
    description: 'Nome da marca',
    example: 'Marca 1',
    required: true
  })
  @IsNotEmpty({
    message: 'Nome da marca é obrigatório'
  })
  @IsString({
    message: 'Nome da marca deve ser uma string'
  })
  nome: string

  @ApiProperty({
    description: 'Descrição da marca',
    example: 'Descrição da marca 1',
    required: false
  })
  @IsString({
    message: 'Descrição da marca deve ser uma string'
  })
  descricao?: string

  @ApiProperty({
    description: 'Imagem pequena da marca',
    example: 'example.png',
    required: false
  })
  @IsString({
    message: 'Imagem pequena da marca deve ser uma string'
  })
  img_p_path?: string

  @ApiProperty({
    description: 'Imagem grande da marca',
    example: 'example.png',
    required: false
  })
  @IsString({
    message: 'Imagem grande da marca deve ser uma string'
  })
  img_g_path?: string
}

export class AuxBrandOutput {
  constructor(auxBrand: any) {
    this.id = auxBrand.id
    this.nome = auxBrand.nome
    this.descricao = auxBrand.descricao
    this.img_p_path = auxBrand.img_p_path
    this.img_g_path = auxBrand.img_g_path
  }

  readonly id?: bigint
  readonly nome: string
  readonly descricao?: string
  readonly img_p_path?: string
  readonly img_g_path?: string
}
