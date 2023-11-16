import { Controller, Get } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger'
import { AuxCutService } from '../domain/aux-cut.service'
import { CreateAuxCutDto, CutOutput } from './dtos/aux-cut.dto'
import { Public } from '@/modules/auth/constants'

@Controller('aux-cut')
export class AuxCutController {
  constructor(private readonly auxCutService: AuxCutService) {}

  @Public()
  @Get()
  @ApiNotFoundResponse({ status: 404, description: 'Corte não encontrado' })
  @ApiOkResponse({
    status: 200,
    description: 'Corte encontrado com sucesso',
    isArray: true,
    type: CreateAuxCutDto
  })
  findAll(): Promise<CutOutput[]> {
    return this.auxCutService.findAll()
  }
}
