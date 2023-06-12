import { Module } from '@nestjs/common';
import { UserGraphqlResolver } from './user-graphql.resolver';
import { UserGraphqlService } from './user-graphql.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGraphqlModel, UserSchema } from './user-graphql-model/user-graphql-model';
import { GlobalService } from './global/global.service';

@Module({
   imports: [
      MongooseModule.forFeature([
         {
            name: UserGraphqlModel.name,
            schema: UserSchema
         }
      ])
   ],
   providers: [UserGraphqlResolver, UserGraphqlService, GlobalService],
})
export class UserGraphqlModule { }
