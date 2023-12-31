import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ExtrasModule } from './modules/extras/extras.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import GraphqlConfig from './config/graphql/config.graphq';
import { ScalarsModule } from './modules/scalars/scalars.module';
import { FaqModule } from './modules/faq/faq.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CarsModule } from './modules/cars/cars.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>(GraphqlConfig),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    ScalarsModule,
    ExtrasModule,
    UsersModule,

    FaqModule,

    CarsModule,
  ],
})
export class AppModule {}
