import { Module } from '@nestjs/common';
import { CodigoAreaService } from './domain/codigo-area.service';
import { CodigoAreaController } from './http/codigo-area.controller';
import { LoggerModule } from '@/common/loggers/logger.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [CodigoAreaController],
  providers: [CodigoAreaService],
  imports: [
    LoggerModule,
    HttpModule
  ],
})
export class CodigoAreaModule {}
