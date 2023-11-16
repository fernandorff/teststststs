import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { TipoValidacaoCodigo } from './enums/tipo-validacao-codigo.enum'

export class ValidateVerificationCodeDto {
  @ApiProperty({
    description: 'Id do usuário.',
    example: '123',
    required: true
  })
  @IsNotEmpty({
    message: 'Id do usuário é obrigatório.'
  })
  id: string

  @ApiProperty({
    description: 'Token inserido pelo usuário.',
    example: '443322',
    required: true
  })
  @IsNotEmpty({
    message: 'Token é obrigatório.'
  })
  token: string

  @ApiProperty({
    description: 'Tipo de validação',
    enum: TipoValidacaoCodigo
  })
  @IsEnum(TipoValidacaoCodigo, { message: 'Tipo de validação inválido.' })
  @IsNotEmpty({
    message: 'Tipo de validação é obrigatório'
  })
  tipo_validacao_codigo: TipoValidacaoCodigo
}
