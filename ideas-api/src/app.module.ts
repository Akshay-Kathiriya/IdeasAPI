import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {join} from 'path';
import { IdeaModule } from './idea/idea.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserModule } from './user/user.module';
import { CommentsModule } from './comments/comments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type":"postgres",
    "host":"localhost",
    "port":5432,
    "username":"postgres",
    "password":"root",
    "database":"ideas",
    "synchronize":true,
    // "dropSchema":true,
    "logging":true,
    "entities": [join(__dirname, '**', '*.entity.{ts,js}'),
  ]
}),     
GraphQLModule.forRoot({
  driver: ApolloDriver,
  playground: true,
  typePaths:['./**/*.graphql'],
  // autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
  // definitions: {
  //   path: join(process.cwd(), 'src/graphql.ts'),
  // },
}) ,IdeaModule, UserModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_FILTER,
    useClass:HttpErrorFilter
  },{
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor
  },{
    provide: APP_PIPE,
    useClass:ValidationPipe
  }],
})
export class AppModule {}
