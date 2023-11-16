import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { LoggerModule } from 'src/common/loggers/logger.module'
import { AuxLanguageController } from './http/aux-language.controller'
import { AuxLanguageService } from './domain/aux-langage.service'

@Module({
  imports: [
    LoggerModule,
    HttpModule
  ],
  controllers: [AuxLanguageController],
  providers: [AuxLanguageService]
})
export class AuxLanguageModule {}
