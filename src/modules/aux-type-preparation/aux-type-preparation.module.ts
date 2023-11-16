import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { LoggerModule } from 'src/common/loggers/logger.module'
import { AuxTypePreparationController } from './http/aux-type-preparation.controller'
import { AuxTypePreparationService } from './domain/aux-type-preparation.service'

@Module({
  imports: [
    LoggerModule,
    HttpModule
  ],
  controllers: [AuxTypePreparationController],
  providers: [AuxTypePreparationService]
})
export class AuxTypePreparationModule {}
