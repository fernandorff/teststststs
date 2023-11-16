import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { AuxTypePreparationOutput } from '../http/dtos/aux-type-preparation.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuxTypePreparationService {
  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  async findAll(): Promise<AuxTypePreparationOutput[]> {
    const { data } = await this.httpService.axiosRef.get(`${this.configService.get('persistenceHost')}/aux-tipo-preparo`)
    const types = data.map((type: any) => new AuxTypePreparationOutput(type))
    return types
  }
}
