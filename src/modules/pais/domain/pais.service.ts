import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaisOutput } from '../http/dtos/pais.dto';

@Injectable()
export class PaisService {

  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  async findAll(query: any): Promise<any> {
    const { data } = await this.httpService.axiosRef.get(`${this.configService.get('persistenceHost')}/pais`, {
      params: query
    })

    const paises = data.map((pais: any) => new PaisOutput(pais))
    return paises
  }
}
