import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { CategoryOutput } from '../http/dtos/aux-category.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuxCategoryService {
  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  async findAll(): Promise<CategoryOutput[]> {
    const { data } = await this.httpService.axiosRef.get(`${this.configService.get('persistenceHost')}/aux-categoria`)
    const categories = data.map((category: any) => new CategoryOutput(category))
    return categories
  }
}
