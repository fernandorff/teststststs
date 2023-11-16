import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AllExceptionsFilter } from './common/filters/exception.filter'
import { AppModule } from './ioC/app.module'
import * as express from 'express'
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger'
import * as bodyParser from 'body-parser'
import { ApiGatewayIntegrationGenerator } from './common/swagger/apiGatewayGenerator'
import { config } from './config/env.config'
import * as fs from 'fs'

async function bootstrap() {
  const { environment, port, prefix, version, swaggerJsonFileName } = await config()
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'debug', 'verbose', 'log'] })
  app.setGlobalPrefix('v1')
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  app.useGlobalFilters(new AllExceptionsFilter())

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${methodKey}-${controllerKey.replace('Controller', '')}`,
    ignoreGlobalPrefix: false
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tracebeeef Admin API')
    .setDescription('API administrativa do Tracebeeef')
    .setVersion(process.env.API_VERSION)

    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig, options)
  document['x-amazon-apigateway-binary-media-types'] = ['multipart/form-data']
  SwaggerModule.setup('api-docs', app, document)

  const swaggerJsonFile = new ApiGatewayIntegrationGenerator({
    passthroughBehavior: 'when_no_match',
    baseUri: 'http://${stageVariables.baseUrlService}',
    type: 'http_proxy',
    requestParameters: {},
    connectionType: 'VPC_LINK',
    connectionId: '${stageVariables.vpcLinkId}'
  }).addToAllPaths(document)

  if (environment === 'local') {
    fs.writeFileSync(`deploy/${swaggerJsonFileName}`, JSON.stringify(swaggerJsonFile))
  }

  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
  app.use('/csv-files', express.static('csv-files'))
  await app.listen(process.env.PORT)
}

bootstrap()
