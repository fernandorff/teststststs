import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CodigoAreaOutput } from './dtos/codigo-area.dto';

@Injectable()
export class CodigoAreaService {

  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  async findAll(query: any): Promise<any> {
    const { data } = await this.httpService.axiosRef.get(`${this.configService.get('persistenceHost')}/codigo-area`, {
      params: query
    })

    const codigos = data.map((codigo: any) => new CodigoAreaOutput(codigo))
    return codigos
  }
}
