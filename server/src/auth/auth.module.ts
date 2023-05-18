import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule, 
    UsersModule, 
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '1h'
      }
    })
  ],
  providers: [
    AuthResolver, 
    AuthService, 
    LocalStrategy,
    JwtStrategy
  ]
})
export class AuthModule { }
