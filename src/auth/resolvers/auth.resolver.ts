import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/auth-jwt.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../decorator/current-user.decorator';
import { ValidRoles } from '../enum/valid-roles.enum';
import { User } from '../../modules/users/entities/user.entity';
// import { PhoneUserInput } from 'src/modules/user/dtos/phone-user.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Query('authLogin')
  async authLogin(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.authService.authLogin(email, password);
  }

  @Query('authLoginAdmin')
  async loginAdmin(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('platform ') platform: string,
  ) {
    return await this.authService.authLoginAdmin(email, password, platform);
  }

  @Query('dataWithToken')
  @UseGuards(JwtAuthGuard)
  async dataWithToken(
    @CurrentUser([ValidRoles.ADMIN, ValidRoles.USER])
    user: User,
  ) {
    return this.authService.dataWithToken(user);
  }

  // @Query('sendCodeSms')
  // async sendCodeSms(
  //   @Args('code') code: string,
  //   @Args('number') number: string,
  // ) {
  //   return await this.authService.sendCodeSms(code, number);
  // }
  // @Query('verifyCodeSms')
  // async verifyCodeSms(
  //   @Args('code') code: string,
  //   @Args('phone') phone: PhoneUserInput,
  // ) {
  //   return await this.authService.verifyCodeSms(code, phone);
  // // }
  // @Query('verifyCodeSmsLogin')
  // async verifyCodeSmsLogin(
  //   @Args('code') code: string,
  //   @Args('phone') phone: PhoneUserInput,
  //   @Args('platform') platform: string,
  //   @Args('location') location: LonLatLoginDto,
  // ) {
  //   return await this.authService.verifyCodeSmsLogin(
  //     code,
  //     phone,
  //     location,
  //     platform,
  //   );
  // }

  // @Mutation('changePassword')
  // @UseGuards(JwtAuthGuard)
  // async changePassword(
  //   @CurrentUser([ValidRoles.ADMIN, ValidRoles.STAFF, ValidRoles.USER])
  //   user: User,
  //   @Args('password') password: string,
  //   @Args('newPassword') newPasword: string,
  // ) {
  //   return this.authService.changePassword(user.email, password, newPasword);
  // }

  @Query('refreshToken')
  async refreshToken(@Args('refresh') refreshToken: string) {
    return await this.authService.refreshToken(refreshToken);
  }

  // @Mutation('requestRecoverPassword')
  // async requestRecoverPassword(@Args('email') email: string) {
  //   return await this.authService.requestPasswordReset(email);
  // }
  // @Mutation('resetPassword')
  // async resetPassword(
  //   @Args('code') code: string,
  //   @Args('newPassword') newPasword: string,
  // ) {
  //   return await this.authService.resetPassword(code, newPasword);
  // }

  // @Query('validateCode')
  // async validateCode(@Args('code') code: string) {
  //   return await this.authService.validateCode(code);
  // }

  //TODO: Endpoint google
  // @Get('google/login')
  // @UseGuards(AuthGuard('google'))
  // handleLogin() {
  //   return { msg: 'Google Authentication' };
  // }

  // // api/auth/google/redirect
  // @Get('google/redirect')
  // @UseGuards(AuthGuard('google'))
  // handleRedirect(@GetUser() user: User, @Res() res) {
  //   const jwt = this.authService.getJwt({ id: user._id });
  //   res.set('authorization', jwt);
  //   res.json({ ...user.toObject(), jwt });
  // }

  // @Query('googleAuth')
  // async googleAuth(
  //   @Args('id_token') id_token: string,
  //   @Args('firstName') firstName: string,
  //   @Args('lastName') lastName: string,
  //   @Args('location') location: LonLatLoginDto,
  // ) {
  //   return await this.authService.googleAuth(
  //     id_token,
  //     firstName,
  //     lastName,
  //     location,
  //   );
  // }
  // @Query('facebookAuth')
  // async facebookAuth(
  //   @Args('id_token') id_token: string,
  //   @Args('location') location: LonLatLoginDto,
  // ) {
  //   return await this.authService.facebookAuth(id_token, location);
  // }
}
