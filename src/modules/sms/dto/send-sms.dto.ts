import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class SendSmsDto {
    @ApiProperty({
        description: 'Id do usuário.',
        example: '123',
        required: true
      })
      @IsNotEmpty({
        message: 'Id do usuário é obrigatório.'
    })
    userId: string
}
  