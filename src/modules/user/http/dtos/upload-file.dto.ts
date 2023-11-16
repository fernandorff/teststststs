import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UploadedFileDto {
  @ApiProperty({
    description: 'Key',
    example: '123',
    required: true
  })
  @IsNotEmpty({
    message: 'key é obrigatório.'
  })
  key: string

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any
}
