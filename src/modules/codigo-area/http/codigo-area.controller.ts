import { Controller, Get, Query } from '@nestjs/common'
import { CodigoAreaService } from '../domain/codigo-area.service'
import { Public } from '@/modules/auth/constants'
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger'
import { CodigoAreaOutput } from '../domain/dtos/codigo-area.dto'

@Controller('codigo-area')
export class CodigoAreaController {
  constructor(private readonly codigoAreaService: CodigoAreaService) {}

  @Public()
  @Get()
  @ApiNotFoundResponse({ status: 404, description: 'Códigos não encontrados' })
  @ApiOkResponse({
    status: 200,
    description: 'Códigos encontrados com sucesso',
    isArray: true
  })
  findAll(@Query() query: any): Promise<CodigoAreaOutput[]> {
    return this.codigoAreaService.findAll(query)
  }
}
