import { HttpService } from '@nestjs/axios'
import { Injectable, NotFoundException } from '@nestjs/common'
import { OneProductOutput, ProductOutput } from '../http/dtos/product.dto'
import { createObjectCsvWriter } from 'csv-writer'
import { S3 } from 'aws-sdk'
import * as fs from 'fs'
import { ConfigService } from '@nestjs/config'

let credentials = {}

@Injectable()
export class ProductService {
  private readonly s3Service = new S3({
    region: process.env.AWS_REGION
  })

  constructor(private readonly httpService: HttpService, private configService: ConfigService) {
    if (process.env.NODE_ENV === 'local') {
      credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
      this.s3Service.config.update(credentials)
    }
  }

  async findAll(query: any): Promise<ProductOutput[]> {
    const { data } = await this.httpService.axiosRef.get(`${this.configService.get('persistenceHost')}/produto`, {
      params: query
    })

    const products = data.map((product: any) => new ProductOutput(product))
    return products
  }

  async create(product: any): Promise<any> {
    const typePreparation = product.tipo_preparo.map((type: any) => {
      return {
        tipo_preparo_id: type.value
      }
    })

    const page = product.pagina.map((pg: any) => pg.value)
    const typeCut = product.tipo_corte_id
    const temperature = product.temperatura
    const language = product.codigo_idioma
    const category = product.categoria_aux
    const lineProduct = [{ marca_id: product.linha_produto }]
    const newBody = {
      ...product,
      pagina_id: page[0],
      tipo_corte_id: typeCut,
      temperatura: temperature,
      codigo_idioma: language,
      categoria_aux: category,
      mod_cms_proteina_cx_lista_cortes_preparo: typePreparation,
      mod_cms_proteina_cx_lista_cortes_marca: lineProduct
    }

    delete newBody.pagina
    delete newBody.tipo_preparo
    delete newBody.linha_produto
    delete newBody.tipo_corte
    delete newBody.images

    try {
      const { data } = await this.httpService.axiosRef.post(
        process.env.SERVICE_DB_PERSISTENCE_HOST + '/produto',
        newBody
      )
      return data
    } catch (err) {
      return new NotFoundException(err.data)
    }
  }

  async update(id: any, product: any): Promise<any> {
    const typePreparation = product.tipo_preparo.map((type: any) => {
      return {
        tipo_preparo_id: type.value
      }
    })

    const page = product.pagina.map((pg: any) => pg.value)
    const typeCut = product.tipo_corte_id
    const temperature = product.temperatura
    const language = product.codigo_idioma
    const category = product.categoria_aux
    const lineProduct = [{ marca_id: product.linha_produto }]
    const newBody = {
      ...product,
      pagina_id: page[0],
      tipo_corte_id: typeCut,
      temperatura: temperature,
      codigo_idioma: language,
      categoria_aux: category,
      mod_cms_proteina_cx_lista_cortes_preparo: typePreparation,
      mod_cms_proteina_cx_lista_cortes_marca: lineProduct
    }

    delete newBody.pagina
    delete newBody.tipo_preparo
    delete newBody.linha_produto
    delete newBody.tipo_corte

    try {
      const { data } = await this.httpService.axiosRef.patch(
        process.env.SERVICE_DB_PERSISTENCE_HOST + `/produto/${id}`,
        newBody
      )
      return data
    } catch (err) {
      console.log(err.data)
    }
  }

  async findOne(id: string): Promise<OneProductOutput> {
    const { data } = await this.httpService.axiosRef.get(process.env.SERVICE_DB_PERSISTENCE_HOST + `/produto/${id}`)
    return new OneProductOutput(data)
  }

  async remove(id: any) {
    try {
      const { data } = await this.httpService.axiosRef.delete(
        process.env.SERVICE_DB_PERSISTENCE_HOST + `/produto/${id}`
      )
      return data
    } catch (err) {
      console.log(err.data)
    }
  }

  async writeToCsv(data: any[], filePath: string): Promise<any> {
    const csvWriter = createObjectCsvWriter({
      path: filePath, // Nome temporário do arquivo
      header: this.generateHeader(data)
    })

    await csvWriter.writeRecords(data)

    const params = {
      Bucket: process.env.QRCODE_BUCKET,
      Key: `csv/${filePath}`,
      Body: fs.createReadStream(filePath)
    }

    try {
      await this.s3Service.upload(params).promise()
      fs.unlinkSync(filePath)
      return
    } catch (err) {
      console.log(`Erro ao gerar URL do .csv ${filePath}`, err)
    }
  }

  private generateHeader(data: any[]): any[] {
    const uniqueFields = new Set()

    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        uniqueFields.add(key)
      })
    })

    return Array.from(uniqueFields)
      .sort()
      .map((field) => ({ id: field, title: field }))
  }
}
