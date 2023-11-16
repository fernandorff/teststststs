import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { LoggerModule } from 'src/common/loggers/logger.module'
import { AuxCategoryService } from './domain/aux-category.service'
import { AuxCategoryController } from './http/aux-category.controller'

@Module({
  imports: [
    LoggerModule,
    HttpModule
  ],
  controllers: [AuxCategoryController],
  providers: [AuxCategoryService]
})
export class AuxCategoryModule {}
