import { Controller, Get } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger'
import { AuxPageService } from '../domain/aux-page.service'
import { AuxPageOutput } from './dtos/aux-page.dto'
import { Public } from '@/modules/auth/constants'
import { CreateAuxCategoryDto } from '@/modules/aux-category/http/dtos/aux-category.dto'

@Controller('aux-page')
export class AuxPageController {
  constructor(private readonly auxPageService: AuxPageService) {}

  @Public()
  @Get()
  @ApiNotFoundResponse({ status: 404, description: 'Categoria não encontrada' })
  @ApiOkResponse({
    status: 200,
    description: 'Categoria encontrada com sucesso',
    type: CreateAuxCategoryDto,
    isArray: true
  })
  findAll(): Promise<AuxPageOutput[]> {
    return this.auxPageService.findAll()
  }
}
