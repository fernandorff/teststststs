import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { LoggerModule } from 'src/common/loggers/logger.module'
import { AuxBrandController } from './http/aux-brand.controller'
import { AuxBrandService } from './domain/aux-brand.service'

@Module({
  imports: [
    LoggerModule,
    HttpModule
  ],
  controllers: [AuxBrandController],
  providers: [AuxBrandService]
})
export class AuxBrandModule {}
