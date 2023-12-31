import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

export default {
  driver: ApolloDriver,
  playground: true,
  typePaths: ['./**/**/**/*.graphql'],
  context: (context: any) => {
    if (context?.extra?.request) {
      return {
        req: {
          ...context?.extra?.request,
          headers: {
            ...context?.extra?.request?.headers,
            ...context?.connectionParams,
          },
        },
      };
    }

    // console.log(context);
    return { req: context?.req };
  },
} as ApolloDriverConfig;
