import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SMSProvider } from '@/modules/sms/sms.provider';
import { LoggerModule } from '@/common/loggers/logger.module';
import { HttpModule } from '@nestjs/axios';
import { Randomizer } from './randomizer.service';

@Module({
  controllers: [],
  imports:[SMSProvider, LoggerModule, HttpModule, Randomizer],
  providers: [SmsService, SMSProvider, Randomizer]
})
export class SmsModule {}
