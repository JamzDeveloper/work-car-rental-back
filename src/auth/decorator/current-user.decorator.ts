import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from '../../modules/users/entities/user.entity';
import { ValidRoles } from '../enum/valid-roles.enum';
import { ExtractJwt } from 'passport-jwt';//TODO: Eliminar dependencias innecesarias

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException(
        `No user inside the request - make sure that we used the AuthGuard`,
      );
    }

    if (roles.length === 0) return user;

    if (roles.includes(user.role as ValidRoles)) {
      return user;
    }

    throw new ForbiddenException(
      `User ${user.fullName} need a valid role [${roles}]`,
    );
  },
);

export const hasLoggedUser = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const getToken = ExtractJwt.fromAuthHeaderAsBearerToken();
    const ctx = GqlExecutionContext.create(context);
    const token = getToken(ctx.getContext().req);
    const decoded = jwt.decode(token, { complete: true });
    const user = (decoded?.payload as any)?.id;
    if (!user) {
      return null;
    }
    return user;
  },
);
