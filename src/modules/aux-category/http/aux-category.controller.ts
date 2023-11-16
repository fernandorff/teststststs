import { Controller, Get } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger'
import { AuxCategoryService } from '../domain/aux-category.service'
import { CategoryOutput, CreateAuxCategoryDto } from './dtos/aux-category.dto'
import { Public } from '@/modules/auth/constants'

@Controller('aux-category')
export class AuxCategoryController {
  constructor(private readonly auxCategoryService: AuxCategoryService) {}

  @Public()
  @Get()
  @ApiNotFoundResponse({ status: 404, description: 'Categoria não encontrada' })
  @ApiOkResponse({
    status: 200,
    description: 'Categoria encontrada com sucesso',
    type: CreateAuxCategoryDto,
    isArray: true
  })
  findAll(): Promise<CategoryOutput[]> {
    return this.auxCategoryService.findAll()
  }
}
