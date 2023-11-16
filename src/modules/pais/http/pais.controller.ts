import { Controller, Get, Query } from '@nestjs/common'
import { PaisService } from '../domain/pais.service'
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger'
import { Public } from '@/modules/auth/constants'
import { PaisOutput } from './dtos/pais.dto'

@Controller('pais')
export class PaisController {
  constructor(private readonly paisService: PaisService) {}

  @Public()
  @Get()
  @ApiNotFoundResponse({ status: 404, description: 'Paises não encontrados' })
  @ApiOkResponse({
    status: 200,
    description: 'Paises encontrados com sucesso',
    isArray: true
  })
  findAll(@Query() query: any): Promise<PaisOutput[]> {
    return this.paisService.findAll(query)
  }
}
