import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AceiteTermosDto {
  @ApiProperty({
    description: 'Id do usuário',
    example: '1',
    required: true
  })
  @IsNotEmpty({
    message: 'Id do usuário é obrigatório'
  })
  id: string

  @ApiProperty({
    description: 'Aceite do usuário',
    example: true,
    required: true
  })
  @IsNotEmpty({
    message: 'Aceite do usuário é obrigatório'
  })
  aceite: boolean
}
