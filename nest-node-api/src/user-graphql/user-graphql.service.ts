import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserGraphqlDto } from './user-graphql-dto/user-graphql-dto';
import { UserGraphqlModel } from './user-graphql-model/user-graphql-model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserGraphqlService {

   constructor(
      @InjectModel(UserGraphqlModel.name)
      private readonly userModel: Model<UserGraphqlModel>,
   ) { }

   async findAll(): Promise<CreateUserGraphqlDto[]> {
      return await this.userModel.find();
   }

   async findOne(id: string) {
      const user = await this.userModel.findOne({ _id: id }).exec();
      if (!user) {
         throw new NotFoundException(`User ${id} not found`);
      }
      return user;
   }

   async update(id: string, updateUser: CreateUserGraphqlDto) {
      const existingUser = await this.userModel.findOneAndUpdate(
         { _id: id }, { $set: updateUser }, { new: true }
      ).exec();
      if (!existingUser) {
         throw new NotFoundException(`User ${id} not found`);
      }
      return existingUser;
   }

   async deleteUser(_id: string): Promise<any> {
      const user = await this.userModel.deleteOne({ _id });
      return user;
   }

   async doSignIn(userLoginDetails: CreateUserGraphqlDto): Promise<CreateUserGraphqlDto> {
      try {
         const { email, password } = userLoginDetails;
         const user: CreateUserGraphqlDto = await this.userModel.findOne({ email });
         if (!user) {
            throw new UnauthorizedException('Invalid Email');
         }
         const encPasswordMatched = await bcrypt.compare(password, user.password);
         if (!encPasswordMatched) {
            throw new UnauthorizedException('Invalid Password');
         }
         return user;
      } catch (error) {
         return error
      }

   }

}
