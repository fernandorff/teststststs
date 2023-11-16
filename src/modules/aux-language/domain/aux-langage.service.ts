import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { AuxLanguageOutput } from '../http/dtos/aux-language.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuxLanguageService {
  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  async findAll(): Promise<AuxLanguageOutput[]> {
    const { data } = await this.httpService.axiosRef.get(`${this.configService.get('persistenceHost')}/aux-idioma`)
    const languages = data.map((language: any) => new AuxLanguageOutput(language))
    return languages
  }
}
