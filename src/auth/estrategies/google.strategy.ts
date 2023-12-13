// import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
// import { AuthService } from '../../auth/services/auth.service';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @Inject(AuthService) private readonly authService: AuthService,
//     configService: ConfigService,
//   ) {
//     super({
//       clientID: configService.get('GOOGLE_AUTH_CLIENT_ID'),
//       clientSecret: configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
//       callbackURL: configService.get('GOOGLE_AUTH_CALLBACK'),
//       scope: ['profile', 'email'],
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: Profile,
//     done: VerifyCallback,
//   ) {
//     const user = await this.authService.validateUserGoogle({
//       email: profile.emails[0].value,
//       displayName: profile.displayName,
//     });

//     if (!user) throw new UnauthorizedException('error server!');
//     // if (!user.isActive) throw new UnauthorizedException('User is not active');
//     done(null, user);
//   }
// }
