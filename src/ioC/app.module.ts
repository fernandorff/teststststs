import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UploadS3Module } from '../common/s3/uploader3.module'
import { AuxCategoryModule } from '@/modules/aux-category/aux-category.module'
import { AuxCutModule } from '@/modules/aux-cut/aux-cut.module'
import { AuxLanguageModule } from '@/modules/aux-language/aux-language.module'
import { AuxBrandModule } from '@/modules/aux-brand/aux-brand.module'
import { AuxTypePreparationModule } from '@/modules/aux-type-preparation/aux-type-preparation.module'
import { ProductModule } from '@/modules/product/product.module'
import { AuxPageModule } from '@/modules/aux-page/aux-page.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { UserModule } from '@/modules/user/user.module'
import { config } from '@/config/env.config'
import { CodigoAreaModule } from '@/modules/codigo-area/codigo-area.module'
import { PaisModule } from '@/modules/pais/pais.module'
import { EmailModule } from '@/modules/email/emailModule'
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n'
import * as process from 'process'
import { SmsModule } from '@/modules/sms/sms.module'
import * as path from 'path'


console.log(path.join(__dirname, '../', '/i18n/'))
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [async () => config()]
    }),
    I18nModule.forRoot({
      fallbackLanguage: process.env.FALLBACK_LANGUAGE,
      loaderOptions: {
        path: path.join(__dirname, '../', '/i18n/'),
        watch: true
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver, new HeaderResolver(['x-lang'])]
    }),
    AuthModule,
    UserModule,
    UploadS3Module,
    AuxCategoryModule,
    AuxCutModule,
    AuxLanguageModule,
    AuxBrandModule,
    ProductModule,
    AuxTypePreparationModule,
    AuxPageModule,
    CodigoAreaModule,
    EmailModule,
    PaisModule,
    SmsModule
  ]
})

export class AppModule {}
