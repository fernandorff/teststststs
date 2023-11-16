import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator'
import { TipoDocumento } from './tipo-documento.enum'

export class UpdateUsuarioDto {
  @ApiProperty({
    description: 'URL da foto do usuário',
    example: 'https://example.com/profile.jpg'
  })
  @IsString({ message: 'A URL da foto precisa ser uma string' })
  imgKey: string

  @ApiProperty({
    description: 'Tipo de documento do usuário',
    example: 'RG'
  })
  @IsNotEmpty({
    message: 'Tipo de documento é obrigatório'
  })
  @IsEnum(TipoDocumento, { message: 'Tipo de documento inválido.' })
  tipo_documento: TipoDocumento

  @ApiProperty({
    description: 'Número do documento do usuário',
    example: '12345678'
  })
  @IsNotEmpty({
    message: 'Número do documento é obrigatório'
  })
  @IsString({ message: 'O número do documento precisa ser uma string' })
  nr_documento: string

  @ApiProperty({
    description: 'Departamento do usuário',
    example: 'Sales'
  })
  @IsNotEmpty({
    message: 'Departamento é obrigatório'
  })
  @IsString({ message: 'O departamento precisa ser uma string' })
  departamento: string

  @ApiProperty({
    description: 'Cargo do usuário',
    example: 'Manager'
  })
  @IsNotEmpty({
    message: 'Cargo é obrigatório'
  })
  @IsString({ message: 'O cargo precisa ser uma string' })
  cargo: string
  
  @ApiProperty({
    description: 'País do usuário',
    example: 'Brasil',
  })
  @IsNotEmpty({
      message: 'País do usuário é obrigatório'
  })
  @IsString({
      message: 'País do usuário precisa ser uma string'
  })
  pais: string

  @ApiProperty({
    description: 'Idioma do usuário',
    example: 'pt-BR'
  })
  @IsNotEmpty({
    message: 'Idioma é obrigatório'
  })
  @IsString({ message: 'O idioma precisa ser uma string' })
  idioma: string

  @ApiProperty({
    description: 'Código do país do celular do usuário',
    example: '55'
  })
  @Matches(/^\d{1,3}$/, {
    message: 'Código de país inválido.',
  })
  @IsString({
    message: 'Código do país do celular precisa ser uma string'
  })
  celular_cod_pais: string;

  @ApiProperty({
    description: 'Número de celular do usuário',
    example: '85911223344'
  })
  @IsNotEmpty({
    message: 'O número de usuário é obrigatório'
  })
  @IsString({ message: 'O número de celular precisa ser uma string' })
  nr_celular: string
}
