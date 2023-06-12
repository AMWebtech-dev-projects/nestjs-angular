import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FileuploadModule } from './fileupload/fileupload.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './core/auth/constants';
import { UserGraphqlModule } from './user-graphql/user-graphql.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { SocketChatGateway } from './chat/socket-chat/socket-chat.gateway';
import { ScheduleModule } from '@nestjs/schedule';

// console.log("process.env.DATABASE_URL", process.env.DATABASE_URL)
@Module({
  imports: [
    //START CONFIGMODULE
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    //START CONFIGMODULE

    //START JWT 
    JwtModule.register({
      global: true,
      secret: jwtConstants.SECRET,
      signOptions: { expiresIn: jwtConstants.TOKEN_EXPIRE },
    }),
    //END JWT 

    //START MONGODB
    MongooseModule.forRoot(process.env.DATABASE_URL, {}),
    //END MONGODB

    //START GRAPH SQL
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: (join(process.cwd(), 'src/schema.gql')),
      definitions: {
        path: (join(process.cwd(), 'src/graphql.ts'))
      },
      debug: true,
      context: ({ req }) => ({ currentUser: req.user }),
    }),
    //END GRAPH SQL 

    UsersModule,
    FileuploadModule,
    UserGraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketChatGateway],
})
export class AppModule { }


