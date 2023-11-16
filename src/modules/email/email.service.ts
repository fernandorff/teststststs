import { BadRequestException, Injectable } from '@nestjs/common'
import { SES } from 'aws-sdk'
import { PopulatedTemplates, TemplateProvider } from '@/common/provider/template.provider'
import * as process from 'process'
import { I18nContext } from 'nestjs-i18n'
import confirmationsConfig from '@/config/confirmations.config'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EmailService {
  constructor() { }

  private config = {
    ...confirmationsConfig
  }

  public getConfig(): Record<string, any> {
    return this.config
  }

  private getSes() {
    return new SES({
      region: "us-east-1"
    })
  }

  async sendEmail(emails, language, content: PopulatedTemplates, i18n: I18nContext) {
    const params = {
      Source: process.env.EMAIL_SOURCE,
      
      Destination: {
        ToAddresses: emails
      },
      Message: {
        Subject: {
          Data: i18n.t('first-access.EMAIL_SUBJECT', { lang: language })
        },
        Body: {
          Text: {
            Data: content.text
          },
          Html: {
            Data: content.html
          }
        }
      }
    }

    try {
      const result = await this.getSes().sendEmail(params).promise()
      console.log('E-mail de notificação enviado:', result.MessageId)
      return true
    } catch (err) {
      console.error('Erro ao enviar o e-mail:', err)
      return false
    }
  }

}
