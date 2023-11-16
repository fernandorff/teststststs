import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class FirstAccessDto {
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
  language?: string

  @ApiProperty({
    description: 'Url de direcionamento.',
    example: 'www.google.com',
    required: true
  })
  @IsString({
    message: 'Url de direcionamento deve ser uma string.'
  })
  redirectUrl?: string
}
