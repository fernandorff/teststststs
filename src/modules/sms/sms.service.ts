import { Injectable } from '@nestjs/common';
import { SMSProvider } from '@/modules/sms/sms.provider';
import confirmationsConfig from '@/config/confirmations.config';


@Injectable()
export class SmsService {
  private $SMS: SMSProvider = new SMSProvider();
  constructor() { }

  private config = {
    ...confirmationsConfig
  }

  public getConfig(): Record<string, any> {
    return this.config
  }

  async send(phoneNumber: string, message: string): Promise<string> {
    await this.$SMS.send(message, phoneNumber);
    return "Sms Enviado com Sucesso!";
  }  
}
