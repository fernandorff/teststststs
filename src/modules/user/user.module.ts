import { Module } from '@nestjs/common';
import { UserService } from './domain/user.service';
import { UserController } from './http/user.controller';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from 'src/common/loggers/logger.module';
import { AwsService } from '../aws/aws.service';
import { SmsService } from '../sms/sms.service';
import { EmailService } from '../email/email.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AwsService, SmsService, EmailService],
  exports: [UserService, AwsService],
  imports: [
    LoggerModule,
    HttpModule
  ],
})
export class UserModule {}
