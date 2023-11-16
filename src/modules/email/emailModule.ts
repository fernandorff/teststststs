import { Global, Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { LoggerModule } from '@/common/loggers/logger.module'
import { HttpModule } from '@nestjs/axios'

@Global()
@Module({
  imports: [LoggerModule, HttpModule],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
