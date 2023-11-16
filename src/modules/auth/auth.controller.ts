import {Body, Controller, HttpCode, HttpStatus, Ip, Post, Req} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from './constants'
import { ApiTags } from '@nestjs/swagger'
import { InsertPasswordDto } from '../user/http/dtos/insert-password.dto'
import { LoginDto } from '../user/http/dtos/login.dto'

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @Public()
  signIn(@Body() signInDto: LoginDto, @Req() request:any) {
    const response =  this.authService.signIn(signInDto.email, signInDto.pwd)
    return response
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  @Public()
  signUp(@Body() insertPasswordDto: InsertPasswordDto) {
    return this.authService.signUp(insertPasswordDto)
  }
}
