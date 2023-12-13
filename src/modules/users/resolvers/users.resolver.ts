import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth-jwt.guard';
import { ValidRoles } from 'src/auth/enum/valid-roles.enum';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { User } from '../entities/user.entity';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query('users')
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser([ValidRoles.ADMIN]) _user: User) {
    return this.usersService.findAll();
  }

  @Query('user')
  @UseGuards(JwtAuthGuard)
  findOne(
    @CurrentUser([ValidRoles.ADMIN]) _user: User,
    @Args('id') id: string,
  ) {
    return this.usersService.findOne(id);
  }

  @Mutation('updateUser')
  @UseGuards(JwtAuthGuard)
  update(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(user, updateUserInput);
  }

  // @Mutation('removeUser')
  // remove(@Args('id') id: number) {
  //   return this.usersService.remove(id);
  // }
}
