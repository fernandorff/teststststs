import { Injectable } from '@nestjs/common'
import { S3 } from 'aws-sdk'

const credentials = {}

@Injectable()
export class AwsService {
  private readonly s3Service = new S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  })

  constructor() {}

  async upload(file: any, key: any): Promise<any> {
    const extension = file.originalname.split('.')[1]
    if (file) {
      try {
        const params = {
          Bucket: process.env.QRCODE_BUCKET,
          Key: `${key}.${extension}`,
          Body: file.buffer
        }

        const data = await this.s3Service.upload(params).promise()
        return data
      } catch (err) {
        console.log(`Erro ao fazer upload da imagem ${key}.${extension}`, err)
      }
    }
  }

  async deleteImage(key: string): Promise<any> {
    const params: any = {
      Bucket: process.env.QRCODE_BUCKET,
      Key: key
    }

    try {
      const data = await this.s3Service.deleteObject(params).promise()
      return data
    } catch (err) {
      console.log(`Erro ao deletar a imagem ${key}`, err)
    }
  }

  async getURLImage(key: string) {
    const params = {
      Bucket: process.env.QRCODE_BUCKET,
      Key: key
    }
    try {
      const url = await this.s3Service.getSignedUrl('getObject', params)
      return {
        url
      }
    } catch (err) {
      console.log(`Erro ao gerar URL da imagem ${key}`, err)
    }
  }

  getSignedUrl(params: any) {
    return this.s3Service.getSignedUrl('getObject', params)
  }
}
