import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { LoggerModule } from 'src/common/loggers/logger.module'
import { AuxCutService } from './domain/aux-cut.service'
import { AuxCutController } from './http/aux-cut.controller'

@Module({
  imports: [
    LoggerModule,
    HttpModule
  ],
  controllers: [AuxCutController],
  providers: [AuxCutService]
})
export class AuxCutModule {}
