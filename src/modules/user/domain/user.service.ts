import { HttpService } from '@nestjs/axios'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ChangePasswordDto } from '@/modules/user/http/dtos/change-password.dto'
import PasswordUtils from '@/common/utils/password.utils'
import { UserOutput } from '../http/dtos/user.dto';
import { CreateUsuarioDto } from '../http/dtos/create-usuario.dto';
import { UpdateUsuarioDto } from '../http/dtos/update-usuario.dto';
import { InsertPasswordDto } from '../http/dtos/insert-password.dto';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Randomizer } from '@/modules/sms/randomizer.service';
import confirmationsConfig from '@/config/confirmations.config';
import { SmsService } from '@/modules/sms/sms.service';
import { EmailService } from '@/modules/email/email.service';
import { FirstAccessDto } from '@/modules/email/dtos/first-access.dto';
import { I18nContext } from 'nestjs-i18n';
import { ConfirmationToken } from '@/modules/email/dtos/confirmation-token.dto';
import { TemplateProvider } from '@/common/provider/template.provider';
import { ValidateVerificationCodeDto } from '../http/dtos/validate-verification-code.dto';
import { TipoValidacaoCodigo } from '../http/dtos/enums/tipo-validacao-codigo.enum';

export type User = any
let credentials = {}
@Injectable()
export class UserService {

  private getDate() {
    return new Date().toISOString().split('T')[0].split('-').reverse().join('/')
  }
  private getTime() {
    return new Date().toLocaleTimeString('pt-pt')
  }

  private readonly template = new TemplateProvider();

  private readonly awsService = new S3({
    region: process.env.AWS_REGION
  })

  private config = {
    ...confirmationsConfig
  }

  public getConfig(): Record<string, any> {
    return this.config
  }

  constructor(private readonly httpService: HttpService, private configService: ConfigService, private smsService: SmsService, private emailService: EmailService) {
    if (process.env.NODE_ENV === 'local') {
      credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
      this.awsService.config.update(credentials)
    }
  }

  async findByEmail(email: any): Promise<any> {
    const { data } = await this.httpService.axiosRef.get(`${this.configService.get('persistenceHost')}/usuario`, {
      params: { email }
    })

    const user = data.map((user: any) => new UserOutput(user))
    return user[0]
  }

  
  async findById(id: string) {
    const { data } = await this.httpService.axiosRef.get(`${this.configService.get('persistenceHost')}/usuario/${id}`)
    const user = new UserOutput(data);
    return user
  }

  async findAll(query: any): Promise<any> {
    const { data } = await this.httpService.axiosRef.get(`${this.configService.get('persistenceHost')}/usuario`, {
      params: query
    })

    const users = data.map((user: any) => new UserOutput(user))
    return users
  }

  async aceiteTermos(query) {
    const { data } = await this.httpService.axiosRef.post(`${this.configService.get('persistenceHost')}/usuario/aceite-termos?aceite=${query.aceite}&id=${query.id}`)
    return new UserOutput(data);
  }

  async create({email, grupo_acesso_id, idioma, nome, pais}: CreateUsuarioDto): Promise<any> {
    await this.httpService.axiosRef.post(`${this.configService.get('persistenceHost')}/usuario`,
      {email, grupo_acesso_id, idioma, nome, pais}
    )
    return "Termos aceito com sucesso."
  }

  async insertPassword(insertPasswordDto: InsertPasswordDto): Promise<any> {
    const { data } = await this.httpService.axiosRef.post(
      `${this.configService.get('persistenceHost')}/usuario/insert-password`,
      {
        email: insertPasswordDto.email,
        pwd: insertPasswordDto.pwd
      }
    )

    const user = new UserOutput(data)
    return user
  }

  async update(id: any, updateUsuarioDto: UpdateUsuarioDto) {
    const { data } = await this.httpService.axiosRef.patch(
      `${this.configService.get('persistenceHost')}/usuario/${id}`,
      updateUsuarioDto as any
    )

    const user = new UserOutput(data)
    return user
  }

  async remove(id: any) {
    try {
      const { data } = await this.httpService.axiosRef.delete(
        process.env.SERVICE_DB_PERSISTENCE_HOST + `/usuario/${id}`
      )
      return data
    } catch (err) {
      console.error(err.data)
    }
  }

  public async sendValidationCode(confirmationToken: ConfirmationToken, i18n: I18nContext): Promise<string> {

    if(TipoValidacaoCodigo.EMAIL === confirmationToken.tipo_validacao_codigo)
      return this.sendValidationCodeToEmail(confirmationToken, i18n);

    return this.sendValidationCodeToPhone(confirmationToken, i18n);
  }

  public async sendValidationCodeToPhone({userId, language}: ConfirmationToken, i18n: I18nContext): Promise<string> {

    const cellPhoneValidationCode = Randomizer.getNumericRandom();

    const content = `${this.config.companyName} | ${this.config.appName} | ${i18n.t('msg-code-validation.SUBJECT', { lang: language })}: [${cellPhoneValidationCode}]`

    const data = await this.findById(userId);
    const phoneWithCode = `+${data.codeArea}${data.numberPhone}`

    await this.smsService.send(phoneWithCode, content)

    await this.httpService.axiosRef.post(`${this.configService.get('persistenceHost')}/usuario/salva-verificao-celular`, { 
      id: userId,
      token: cellPhoneValidationCode
    })

    return "Sms Enviado com Sucesso!"
  }

  async sendFirstAccessMail({ userId, language, redirectUrl }: FirstAccessDto, i18n: I18nContext) {
    const content = await this.template.populate('first-access', {
      metaTitle: i18n.t('first-access.META_TITLE', { lang: language }),
      bodyPlatform: i18n.t('first-access.BODY_PLATFORM', { lang: language }),
      bodyPlatformName: i18n.t('first-access.BODY_PLATFORM_NAME', { lang: language }),
      bodyConfirmRegistration: i18n.t('first-access.BODY_CONFIRM_REGISTRATION', { lang: language }),
      bodyMainMessage: i18n.t('first-access.BODY_MAIN_MESSAGE', { lang: language }),
      bodyButtonText: i18n.t('first-access.BODY_BUTTON_TEXT', { lang: language }),
      bodyDate: this.getDate(),
      bodyTime: this.getTime(),
      footerTrademark: i18n.t('constants.TRADEMARK', { lang: language }),
      redirectUrl:  redirectUrl || process.env.CREATE_PASSWORD_REDIRECT_URL
    })

    const data = await this.findById(userId);

    return await this.emailService.sendEmail([data.email], language, content, i18n);
  }

  async sendValidationCodeToEmail({ userId, language }: ConfirmationToken, i18n: I18nContext) {
    const emailValidationToken = Randomizer.getNumericRandom();

    const content = await this.template.populate('email-token-confirmation', {
      metaTitle: i18n.t('email-confirmation-token.META_TITLE', { lang: language }),
      bodyTitle: i18n.t('email-confirmation-token.BODY_TITLE', { lang: language }),
      bodyHelloMessage: i18n.t('email-confirmation-token.BODY_HELLO_MESSAGE', { lang: language }),
      bodyMainMessage: i18n.t('email-confirmation-token.BODY_MAIN_MESSAGE', { lang: language }),
      bodyButtonText: i18n.t('email-confirmation-token.BODY_BUTTON_TEXT', { lang: language }),
      footerContactPhone: i18n.t('constants.CONTACT_PHONE', { lang: language }),
      footerContactWebsite: i18n.t('constants.CONTACT_WEBSITE', { lang: language }),
      footerContactEmail: i18n.t('constants.CONTACT_EMAIL', { lang: language }),
      footerCompanyDescription: i18n.t('constants.COMPANY_DESCRIPTION', { lang: language }),
      footerTrademark: i18n.t('constants.TRADEMARK', { lang: language }),
      redirectUrl: process.env.EMAIL_TOKEN_REDIRECT_URL,
      token: emailValidationToken
    })

    const data = await this.findById(userId);

    await this.emailService.sendEmail([data.email], language, content, i18n);

    await this.httpService.axiosRef.post(`${this.configService.get('persistenceHost')}/usuario/salva-verificao-email`, { 
      id: userId,
      token: emailValidationToken
    })

    return "Email de confirmação enviado com sucesso" 
  }

  async changePassword(request: ChangePasswordDto) {
    if (request.newPwd !== request.newPwdConfirm) {
      throw new BadRequestException('Nova senha e confirmação são diferentes.')
    }

    const foundUser = await this.findByEmail(request.email)
    if (!foundUser) {
      throw new BadRequestException('Usuário não encontrado.')
    }

    const isPasswordValid = await PasswordUtils.compare(foundUser.pwd, request.currentPwd)
    if (!isPasswordValid) {
      throw new BadRequestException('Senha atual incorreta.')
    }

    const hashedPassword = await PasswordUtils.encrypt(request.newPwd)
    const insertPasswordDto: InsertPasswordDto = {
      email: request.email,
      pwd: hashedPassword
    }

    const { data } = await this.httpService.axiosRef.post(
      `${this.configService.get('persistenceHost')}/usuario/change-password`,
      insertPasswordDto as any
    )

    return new UserOutput(data)
  }

  
  async validateCode({id, token, tipo_validacao_codigo}: ValidateVerificationCodeDto) {
    const { data } = await this.httpService.axiosRef.post(`${this.configService.get('persistenceHost')}/usuario/valida-codigo`, { 
      id,
      token,
      tipo_validacao_codigo
    })

    return data;
  }
}
