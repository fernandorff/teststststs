import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAuxCategoryDto {
  @ApiProperty({
    example: 1,
    description: 'Id da categoria',
    required: false,
    readOnly: true
  })
  id?: bigint

  @ApiProperty({
    example: 'Bovino',
    description: 'Nome da categoria',
    required: true
  })
  @IsNotEmpty({
    message: 'Nome da categoria é obrigatório'
  })
  @IsString({
    message: 'Nome da categoria precisa ser uma string'
  })
  nome: string

  @ApiProperty({
    example: 'categoria.png',
    description: 'Imagem pequena que represente a categoria',
    required: false
  })
  @IsString({
    message: 'Imagem pequena da categoria precisa ser uma string'
  })
  img_p_path?: string

  @ApiProperty({
    example: 'categoria.png',
    description: 'Imagem grande que represente a categoria',
    required: false
  })
  @IsString({
    message: 'Imagem grande da categoria precisa ser uma string'
  })
  img_g_path?: string
}
export class CategoryOutput {
  constructor(category: any) {
    this.id = category.id
    this.nome = category.nome
    this.img_p_path = category.img_p_path
    this.img_g_path = category.img_g_path
  }

  readonly id?: bigint
  readonly nome: string
  readonly img_p_path?: string
  readonly img_g_path?: string
}
