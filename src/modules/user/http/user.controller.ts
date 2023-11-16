import { Public } from '@/modules/auth/constants'
import { ChangePasswordDto } from '@/modules/user/http/dtos/change-password.dto'
import {
  Controller,
  Get,
  Request,
  Query,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import { UserService } from '../domain/user.service'
import {
  ApiConsumes,
  ApiExtension,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger'
import { UserOutput } from './dtos/user.dto'
import { CreateUsuarioDto } from './dtos/create-usuario.dto'
import { UpdateUsuarioDto } from './dtos/update-usuario.dto'
import { AwsService } from 'src/modules/aws/aws.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ValidateVerificationCodeDto } from './dtos/validate-verification-code.dto'
import { FirstAccessDto } from '@/modules/email/dtos/first-access.dto'
import { I18n, I18nContext } from 'nestjs-i18n'
import { ConfirmationToken } from '@/modules/email/dtos/confirmation-token.dto'
import { UploadedFileDto } from './dtos/upload-file.dto'

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly awsService: AwsService) {}

  @Public()
  @Get()
  @ApiNotFoundResponse({ status: 404, description: 'Usuários não encontrados' })
  @ApiOkResponse({
    status: 200,
    description: 'Usuários encontrados com sucesso',
    isArray: true
  })
  findAll(@Query() query: any): Promise<UserOutput[]> {
    return this.userService.findAll(query)
  }

  @Public()
  @Get('profile')
  @ApiOperation({ summary: 'Return current logged in users.' })
  getProfile(@Request() req) {
    return req.user
  }

  @Public()
  @Post()
  @ApiOkResponse({
    status: 200,
    description: 'Criar um usuário',
    type: CreateUsuarioDto
  })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.userService.create(createUsuarioDto)
  }

  @Public()
  @Patch(':id')
  @ApiOkResponse({
    status: 200,
    description: 'Atualizar um usuário',
    type: UpdateUsuarioDto
  })
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.userService.update(id, updateUsuarioDto)
  }

  @Public()
  @Delete(':id')
  @ApiOkResponse({
    status: 200,
    description: 'Deletar um usuário'
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }

  @Public()
  @Get('image/:key')
  async getImage(@Param('key') key: string): Promise<any> {
    return this.awsService.getURLImage(key)
  }

  @Post('upload')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  upload(@UploadedFile() file: Express.Multer.File, @Body() uploadDto: UploadedFileDto) {
    return this.awsService.upload(file, uploadDto.key)
  }

  @Delete('delete-img/:key')
  @Public()
  removeUpload(@Param('key') key: string) {
    return this.awsService.deleteImage(key)
  }

  @Public()
  @Post('aceite-termos')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiQuery({ name: 'aceite', type: 'boolean' })
  async aceiteTermos(@Query() query): Promise<any> {
    return this.userService.aceiteTermos(query)
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/change-password')
  @Public()
  changePassword(@Body() request: ChangePasswordDto) {
    return this.userService.changePassword(request)
  }

  @Public()
  @Post('/first-access')
  @ApiOkResponse({
    status: 200,
    description: 'Enviar o email de primeiro acesso',
    type: FirstAccessDto
  })
  sendFirsAccessMail(@Body() body: FirstAccessDto, @I18n() i18n: I18nContext) {
    return this.userService.sendFirstAccessMail(body, i18n)
  }

  @Post('/send-validation-code')
  @Public()
  validationCode(@Body() body: ConfirmationToken, @I18n() i18n: I18nContext) {
    return this.userService.sendValidationCode(body, i18n)
  }

  @Post('/validate-code')
  @Public()
  validateCode(@Body() body: ValidateVerificationCodeDto) {
    return this.userService.validateCode(body)
  }
}
