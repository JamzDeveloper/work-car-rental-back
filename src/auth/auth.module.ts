import { Module, forwardRef } from '@nestjs/common';

import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../modules/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './estrategies/jwt.strategy';
// import { SmtpModule } from 'src/smtp/smtp.module';
import { UsersModule } from '../modules/users/users.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configServices: ConfigService) => {
        return {
          secret: configServices.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configServices.get('JWT_TIME_EXPIRATION'),
          },
        };
      },
    }),
    // SmtpModule,
    // forwardRef(() => UsersModule),
  ],

  providers: [JwtStrategy, AuthService, AuthResolver],
  exports: [JwtStrategy, JwtModule, PassportModule, AuthService],
})
export class AuthModule {}
