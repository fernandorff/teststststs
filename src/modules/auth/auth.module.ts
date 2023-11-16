import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { LoggerModule } from 'src/common/loggers/logger.module';
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from './strategies/jwt-strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    LoggerModule,
    HttpModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  },],
  exports: [AuthService]
})
export class AuthModule {}
