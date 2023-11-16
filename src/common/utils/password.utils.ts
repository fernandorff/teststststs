import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'
const scrypt = promisify(_scrypt)

export default class PasswordUtils {
  static async encrypt(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return salt + '.' + hash.toString('hex');
  }

  static async compare(savedPassword: string, suppliedPassword: string): Promise<boolean> {
    const [salt, storedHash] = savedPassword.split('.');
    const hash = (await scrypt(suppliedPassword, salt, 32)) as Buffer;
    return storedHash === hash.toString('hex');
  }
}