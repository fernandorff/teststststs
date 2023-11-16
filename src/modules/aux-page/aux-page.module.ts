import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { LoggerModule } from 'src/common/loggers/logger.module'
import { AuxPageController } from './http/aux-page.controller'
import { AuxPageService } from './domain/aux-page.service'

@Module({
  imports: [
    LoggerModule,
    HttpModule
  ],
  controllers: [AuxPageController],
  providers: [AuxPageService]
})
export class AuxPageModule {}
