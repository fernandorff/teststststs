import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { LoggerModule } from 'src/common/loggers/logger.module'
import { ProductController } from './http/product.controller'
import { ProductService } from './domain/product.service'
import { UploadS3Module } from 'src/common/s3/uploader3.module'
import { AwsService } from '../aws/aws.service'
import { Randomizer } from '../sms/randomizer.service'

@Module({
  imports: [
    LoggerModule,
    HttpModule,
    UploadS3Module
  ],
  controllers: [ProductController],
  providers: [ProductService, AwsService, Randomizer]
})
export class ProductModule {}
