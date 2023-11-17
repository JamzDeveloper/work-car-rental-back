import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ScalarsModule } from './modules/scalars/scalars.module';
import GraphqlConfig from './config/graphql/config.graphq';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>(GraphqlConfig),
    ScalarsModule,
  ],
})
export class AppModule {}
