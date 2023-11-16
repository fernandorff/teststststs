import { Controller, Get } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger'
import { AuxLanguageService } from '../domain/aux-langage.service'
import { AuxLanguageOutput, CreateAuxLanguageDto } from './dtos/aux-language.dto'
import { Public } from '@/modules/auth/constants'

@Controller('aux-language')
export class AuxLanguageController {
  constructor(private readonly auxLanguageService: AuxLanguageService) {}

  @Public()
  @Get()
  @ApiNotFoundResponse({ status: 404, description: 'Idioma não encontrado' })
  @ApiOkResponse({
    status: 200,
    description: 'Idioma encontrado com sucesso',
    type: CreateAuxLanguageDto,
    isArray: true
  })
  findAll(): Promise<AuxLanguageOutput[]> {
    return this.auxLanguageService.findAll()
  }
}
