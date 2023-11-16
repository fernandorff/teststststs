import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from 'src/modules/user/domain/user.service'
import { JwtService } from '@nestjs/jwt'
import { scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'
import { InsertPasswordDto } from '../user/http/dtos/insert-password.dto'
import PasswordUtils from "@/common/utils/password.utils";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async signUp(insertPasswordDto: InsertPasswordDto) {
    const password = insertPasswordDto.pwd

    insertPasswordDto.pwd = await PasswordUtils.encrypt(password)

    return await this.usersService.insertPassword(insertPasswordDto)
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)

    const [salt, storedHash] = user.pwd.split('.')

    const hash = (await scrypt(pass, salt, 32)) as Buffer

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Incorrect password')
    }

    const payload = { sub: user.userId, email: user.email }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
