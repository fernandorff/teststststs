import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { AuxPageOutput } from '../http/dtos/aux-page.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuxPageService {
  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  async findAll(): Promise<AuxPageOutput[]> {
    const { data } = await this.httpService.axiosRef.get(`${this.configService.get('persistenceHost')}/aux-pagina`)
    const pages = data.map((page: any) => new AuxPageOutput(page))
    return pages
  }
}
