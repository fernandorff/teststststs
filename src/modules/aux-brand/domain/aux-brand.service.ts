import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { AuxBrandOutput } from '../http/dtos/aux-brand.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuxBrandService {
  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}
  async findAll(): Promise<AuxBrandOutput[]> {
    const { data } = await this.httpService.axiosRef.get(`${this.configService.get('persistenceHost')}/aux-marca`)
    const brands = data.map((brand: any) => new AuxBrandOutput(brand))
    return brands
  }
}
