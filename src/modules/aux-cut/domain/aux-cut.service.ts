import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { CutOutput } from '../http/dtos/aux-cut.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuxCutService {
  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  async findAll(): Promise<CutOutput[]> {
    const { data } = await this.httpService.axiosRef.get(`${this.configService.get('persistenceHost')}/aux-corte`)
    const cuts = data.map((cut: any) => new CutOutput(cut))
    return cuts
  }
}
