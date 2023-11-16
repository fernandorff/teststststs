import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  Req,
  UseInterceptors
} from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger'
import { ProductService } from '../domain/product.service'
import { CreateProductDto, OneProductOutput, ProductOutput } from './dtos/product.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { AwsService } from 'src/modules/aws/aws.service'
import { Public } from '@/modules/auth/constants'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly awsService: AwsService) {}

  @Public()
  @Get()
  @ApiNotFoundResponse({ status: 404, description: 'Produtos não encontrados' })
  @ApiOkResponse({
    status: 200,
    description: 'Produtos encontrados com sucesso',
    isArray: true
  })
  findAll(@Query() query: any): Promise<ProductOutput[]> {
    return this.productService.findAll(query)
  }

  @Public()
  @Post()
  @ApiOkResponse({
    status: 200,
    description: 'Criar um produto',
    type: CreateProductDto
  })
  create(@Body() createProdutoDto: any): Promise<any> {
    return this.productService.create(createProdutoDto)
  }

  @Public()
  @Patch('/:id')
  update(@Body() productDto: any, @Param('id') id: any): Promise<any> {
    return this.productService.update(id, productDto)
  }

  @Public()
  @Get('/:id')
  findOne(@Param('id') id: any): Promise<OneProductOutput> {
    return this.productService.findOne(id)
  }

  @Public()
  @Delete('/:id')
  remove(@Param('id') id: any): Promise<any> {
    return this.productService.remove(id)
  }

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('images'))
  upload(@UploadedFile() files: any, @Req() request) {
    const { sku, size } = request.body
    const key = `${sku}.${size}`
    return this.awsService.upload(files, key)
  }
  @Post('upload/:key')
  @Public()
  removeUpload(@Param('key') key: any, @Body() request) {
    const { sku } = request
    key = `${sku}/${key}`
    return this.awsService.deleteImage(key)
  }

  @Public()
  @Post('download')
  async downloadCSV(@Query() query: any): Promise<any> {
    const found = await this.productService.findAll(query)
    const formatFound = JSON.parse(JSON.stringify(found))
    const data = formatFound.map((item) => {
      const row = {
        ...item,
        tipo_corte: item.tipo_corte.nome,
        linha_produto: item.linha_produto.map((linha) => {
          return linha.nome
        }),
        pagina_id: item.pagina_id,
        flag_ativo: item.flag_ativo === true ? 'Ativo' : 'Inativo',
        created_at: new Date(item.created_at).toLocaleDateString('pt-BR'),
        updated_at: new Date(item.updated_at).toLocaleDateString('pt-BR')
      }

      return row
    })
    const newData = JSON.parse(JSON.stringify(data))

    await this.productService.writeToCsv(newData, `${query.fileName}.csv`)

    const params = {
      Bucket: process.env.QRCODE_BUCKET,
      Key: `csv/${query.fileName}.csv`
    }

    try {
      const downloadUrl = this.awsService.getSignedUrl(params)
      return {
        url: downloadUrl
      }
    } catch (err) {
      console.log(err)
    }
  }

  @Public()
  @Post('image/:img')
  async getImage(@Param('img') img: any, @Body() request): Promise<any> {
    const { sku } = request
    img = `${sku}/${img}`
    return this.awsService.getURLImage(img)
  }
}
