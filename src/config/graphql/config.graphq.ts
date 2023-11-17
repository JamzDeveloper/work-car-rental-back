import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

export default {
  driver: ApolloDriver,
  playground: true,
  typePaths: ['./**/**/**/*.graphql'],
} as ApolloDriverConfig;
