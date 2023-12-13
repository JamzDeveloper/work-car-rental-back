import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { User, UserDocument } from '../entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';
import { AuthService } from 'src/auth/services/auth.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    await this.existEmail(createUserInput.email);
    const salt = await genSalt(10);
    const password = await hash(createUserInput.password, salt);

    const userName = await this.createUsername(createUserInput.fullName);
    const newUser = await this.userModel.create({
      ...createUserInput,
      password,
      username: userName,
    });

    await newUser.save();

    const tokens = this.authService.generateTokens({
      id: newUser._id.toString(),
      role: newUser.role,
    });

    return { user: newUser.toJSON(), ...tokens };
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    const result = await this.userModel.findById(id);
    if (!result) {
      throw new BadRequestException(`User with id:${id} not found`);
    }
    return result;
  }

  async update(user: User | any, updateUserInput: UpdateUserInput) {
    const userFound = await this.findOne(user._id);

    await userFound.updateOne({ ...updateUserInput });

    return {
      ...userFound.toJSON(),
      ...updateUserInput,
    };
  }

  private async existEmail(email: string) {
    const existsEmail = await this.userModel.findOne({ email });
    if (existsEmail) {
      throw new BadRequestException(`User with email: ${email} already exists`);
    }
  }
  async createUsername(fullName: string): Promise<string> {
    let username = this.newUsername(fullName);
    let foundUser = null;

    do {
      username = this.newUsername(fullName);
      foundUser = await this.userModel.findOne({
        username: username,
      });
    } while (foundUser);

    return username;
  }

  private newUsername(fullName: string): string {
    return (
      fullName.toLocaleLowerCase().split(/ /g).join('_') +
      '_' +
      Math.ceil(Math.random() * (1000000 - 100000) + 100000)
    );
  }
}
