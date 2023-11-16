import { TipoValidacaoCodigo } from '@/modules/user/http/dtos/enums/tipo-validacao-codigo.enum'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class ConfirmationToken {
  @ApiProperty({
    description: 'Id do destinatário.',
    example: '11223344',
    required: true
  })
  @IsNotEmpty({
    message: 'Id do destinatário é obrigatório.'
  })
  userId: string

  @ApiProperty({
    description: 'Idioma dos destinatário.',
    example: 'en-US',
    required: true
  })
  @IsString({
    message: 'Idioma do destinatário deve ser uma string.'
  })
  language: string

  
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
