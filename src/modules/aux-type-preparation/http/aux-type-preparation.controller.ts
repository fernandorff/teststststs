import { Controller, Get } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger'
import { AuxTypePreparationService } from '../domain/aux-type-preparation.service'
import { AuxTypePreparationOutput, CreateAuxTypePreparationDto } from './dtos/aux-type-preparation.dto'
import { Public } from '@/modules/auth/constants'

@Controller('aux-type-preparation')
export class AuxTypePreparationController {
  constructor(private readonly auxTypePreparationService: AuxTypePreparationService) {}

  @Public()
  @Get()
  @ApiNotFoundResponse({ status: 404, description: 'Nenhum tipo de preparação foi encontrado' })
  @ApiOkResponse({
    status: 200,
    description: 'Tipos de preparação encontrados com sucesso',
    isArray: true,
    type: CreateAuxTypePreparationDto
  })
  findAll(): Promise<AuxTypePreparationOutput[]> {
    return this.auxTypePreparationService.findAll()
  }
}
