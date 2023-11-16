import { Module } from '@nestjs/common';
import { PaisService } from './domain/pais.service';
import { PaisController } from './http/pais.controller';
import { LoggerModule } from '@/common/loggers/logger.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PaisController],
  providers: [PaisService],
  imports: [
    LoggerModule,
    HttpModule
  ],
})
export class PaisModule {}
