import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'), // 'localhost from .env'
        port: configService.get('DATABASE_PORT'), // 'Port from .env'
        username: configService.get('DATABASE_USER'), // 'user from .env'
        password: configService.get('DATABASE_PASSWORD'), // 'password from .env'
        database: configService.get('DATABASE_DB'), // 'database from .env'
        entities: [join(__dirname, '**', '*.model.{ts,js}')], //c'est des fichiers qui on veut appeler .ts ou .js
        synchronize: true, // Pour sync la base de données par rapport au model type ORM qui fait ça
      }),
    }),
    ArticleModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
