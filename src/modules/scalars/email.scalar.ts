import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/i;

function validateEmail(value: unknown): string | null {
  if (typeof value !== 'string' || !emailRegex.test(value)) {
    return null;
  }
  return value;
}

@Scalar('Email', (type) => String)
export class EmailScalar implements CustomScalar<string, string> {
  description = 'Email custom scalar type';

  parseValue(value: string): string | null {
    return validateEmail(value);
  }

  serialize(value: string): string | null {
    return validateEmail(value);
  }

  parseLiteral(ast: ValueNode): string | null {
    if (ast.kind === Kind.STRING) {
      return validateEmail(ast.value);
    }
    return null;
  }
}
