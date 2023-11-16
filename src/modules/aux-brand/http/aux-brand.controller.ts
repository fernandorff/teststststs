import { Controller, Get } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger'
import { AuxBrandService } from '../domain/aux-brand.service'
import { AuxBrandOutput, CreateAuxBrandDto } from './dtos/aux-brand.dto'
import { Public } from '@/modules/auth/constants'

@Controller('aux-brand')
export class AuxBrandController {
  constructor(private readonly auxBrandService: AuxBrandService) {}

  @Public()
  @Get()
  @ApiNotFoundResponse({ status: 404, description: 'Marca não encontrada' })
  @ApiOkResponse({
    status: 200,
    description: 'Marca encontrada com sucesso',
    type: CreateAuxBrandDto,
    isArray: true
  })
  findAll(): Promise<AuxBrandOutput[]> {
    return this.auxBrandService.findAll()
  }
}
