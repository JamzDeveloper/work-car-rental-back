import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
// import { HttpService } from '@nestjs/axios/dist';
import { concat, firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UpdateAuthInput } from '../dto/update-auth.input';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../modules/users/entities/user.entity';
import { Model } from 'mongoose';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserDetails } from '../interfaces/user-google.interfaace';
// import { SmtpService } from 'src/smtp/services/smtp.service';
import generateCode from '../../common/function/code.common';
// import { PhoneUserInput } from 'src/modules/user/dtos/phone-user.dto';
// import googleVerify from '../helpers/googleVerify';
import { UsersService } from '../../modules/users/services/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>, // private smstpService: SmtpService,
  ) {}
  async authLogin(email: string, password: string) {
    const foundUser = await this.userModel.findOne({ email });

    if (!foundUser) throw new UnauthorizedException();

    const match = await compare(password, foundUser.password);

    if (!match) throw new UnauthorizedException();
    const tokens = this.generateTokens({
      id: foundUser._id.toString(),
      role: foundUser.role,
    });

    return {
      user: foundUser,
      ...tokens,
    };
  }
  async dataWithToken(user: User) {
    // return await this.userService.dataUser(user);
  }
  async authLoginAdmin(email: string, password: string, platform: string) {
    const foundUser = await this.userModel.findOne({ email });

    if (!foundUser) throw new UnauthorizedException();

    const match = await compare(password, foundUser.password);

    if (!match) throw new UnauthorizedException();
    const tokens = this.generateTokens({
      id: foundUser._id.toString(),
      role: foundUser.role,
    });

    await foundUser.updateOne({
      $push: {
        connectedDevices: {
          name: platform ? platform : 'unknown',
          jwt: tokens.refreshToken,
        },
      },
    });
    return {
      user: foundUser,
      ...tokens,
    };
  }

  async sendCodeSms(country: string, number: string) {
    try {
      const smsVerificationCode = generateCode();
      // const result = await this.smstpService.sendSMS(
      //   `+${country}${number}`,
      //   `Bienvenido a sugner!!\n Tu código de verificación es:${smsVerificationCode}`,
      // );
      const result = true;
      if (result) {
        const existUser = await this.userModel.findOne({
          'phoneNumber.number': number,
          'phoneNumber.code': country,
        });

        if (existUser) {
          await existUser.updateOne({
            smsVerificationCode: smsVerificationCode,
          });
          return smsVerificationCode;
        }

        const newUser = await this.userModel.create({
          phoneNumber: {
            code: country,
            number,
          },
          smsVerificationCode: smsVerificationCode,
          geolocation: {
            coordinates: [0, 0],
          },
          locations: [],
        });
        newUser.save();
        return smsVerificationCode;
      } else {
        throw new BadRequestException(`Error al enviar el sms`);
      }
    } catch (err) {
      throw new BadRequestException(`Error al enviar el sms`);
    }
  }

  // async verifyCodeSms(code: string, phone: PhoneUserInput) {
  //   const userFound = await this.userModel.findOne({
  //     phoneNumber: phone,
  //     smsVerificationCode: code,
  //   });
  //   if (!userFound) {
  //     throw new BadRequestException(`Invalid code`);
  //   }
  //   return true;
  // }

  // async verifyCodeSmsLogin(
  //   code: string,
  //   phone: PhoneUserInput,
  //   platform: string,
  // ) {
  //   const userFound = await this.userModel.findOne({
  //     phoneNumber: phone,
  //     smsVerificationCode: code,
  //     deleted: false,
  //   });
  //   if (!userFound) {
  //     throw new BadRequestException(`Invalid code`);
  //   }

  //   const tokens = this.generateTokens({
  //     id: userFound._id.toString(),
  //     role: userFound.role,
  //   });

  //   return {
  //     user: userFound,
  //     ...tokens,
  //   };
  // }

  async validateUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async validateUserGoogle(details: UserDetails) {
    const user = await this.userModel.findOne({ email: details.email });
    if (user) return user;

    const newUser = this.userModel.create({
      email: details.email,
      username: details.displayName.trim().toLocaleLowerCase(),
      password: 'password',
      locations: [],
    });
    return newUser;
  }

  async refreshToken(refresh: string) {
    const validate = await this.jwtService.verify(refresh, {
      secret: process.env.REFRESH_SECRET,
    });

    if (!validate) throw new Error('Refresh token expirado');

    const { id, role } = validate;

    const tokens = this.generateTokens({
      id,
      role,
    });

    return tokens;
  }
  async getJwtPayLoad(token: string) {
    const validate = await this.jwtService.verify(token);
    console.log('service', validate);
    return validate;
  }

  generateTokens(payload: JwtPayload) {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.REFRESH_SECRET,
        expiresIn:
          payload.role === 'ADMIN'
            ? '7d'
            : payload.role === 'TEACHER'
            ? '14d'
            : '1y',
      }),
    };
  }

  // async googleAuth(
  //   id_token: string,
  //   fullName: string,
  // ) {
  //   const data = await googleVerify(id_token);
  //   if (!data) {
  //     throw new BadRequestException(`Google auth failed`);
  //   }

  //   const user = await this.userModel.findOne({ email: data.email });
  //   if (user) {
  //     const tokens = this.generateTokens({
  //       id: user._id.toString(),
  //       role: user.role,
  //     });

  //     return {
  //       user,
  //       ...tokens,
  //     };
  //   } else {
  //     let result = false;
  //     let username = null;
  //     do {
  //       username = `${fullName.toLocaleLowerCase()}_${Date.now()}`;
  //       result = await this.userService.disponibleUsername(username);
  //     } while (result == false);
  //     const newUser = await this.userModel.create({
  //       email: data.email,
  //       firstName: firstName,
  //       lastName: lastName,
  //       photo: data.picture,
  //       password: null,
  //       username,
  //       acceTokenGoogle: data.accessToken,

  //     });
  //     await newUser.save();
  //     // await this.updateLocationUser(newUser, location, address);

  //     const tokens = this.generateTokens({
  //       id: newUser._id.toString(),
  //       role: newUser.role,
  //     });
  //     return { user: newUser, ...tokens };
  //   }
  // }

  // async facebookAuth(id_token: string) {
  //   const apiUrl = `${process.env.FACEBOOK_URI}/me?access_token=${id_token}&fields=id,name,gender,likes,picture,email`;
  //   const { data: userFacebook }: any = await firstValueFrom(
  //     this.httpService.get(apiUrl),
  //   );

  //   const userFound = await this.userModel.findOne({
  //     facebookId: userFacebook.id,
  //     deleted: false,
  //   });

  //   if (!userFound) {
  //     let { name, picture }: { name: string; picture: any } = userFacebook;
  //     let result = false;
  //     let username = null;

  //     let nameTemporal = name.split(' ').join('_').toLocaleLowerCase();

  //     do {
  //       username = `${nameTemporal}_${Date.now()}`;
  //       result = await this.userService.disponibleUsername(username);
  //     } while (result == false);

  //     const newUser = await this.userModel.create({
  //       email: userFacebook.email ? userFacebook.email : '',
  //       firstName: name,
  //       photo: userFacebook.picture.data.url,
  //       password: null,
  //       username,
  //       facebookId: userFacebook.id,
  //       locations: [
  //         {
  //           lat: location.lat,
  //           lon: location.lon,
  //           type: TYPELOCATION.REAL,
  //         },
  //       ],
  //     });
  //     await newUser.save();
  //     await this.updateLocationUser(newUser, location, address);

  //     const tokens = this.generateTokens({
  //       id: newUser._id.toString(),
  //       role: newUser.role,
  //     });

  //     return { user: newUser, ...tokens };
  //   } else {
  //     const tokens = this.generateTokens({
  //       id: userFound._id.toString(),
  //       role: userFound.role,
  //     });
  //     await this.updateLocationUser(userFound, location, address);

  //     return { user: userFound, ...tokens };
  //   }
  // }
}
