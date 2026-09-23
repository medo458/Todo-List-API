import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity.js';
import { AuthGuard } from './guards/authentication.guard.js';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constant.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AuthService, {
    provide: 'APP_GUARD',
    useClass: AuthGuard,
  }],
  controllers: [AuthController]
})
export class AuthModule {}
