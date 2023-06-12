import { Injectable, Logger, MessageEvent, NotFoundException, Sse, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './users.dto';
import { InjectModel } from '@nestjs/mongoose';
// import { Health, Users } from './users.model';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import { Cron } from '@nestjs/schedule';
import { interval, map, Observable } from 'rxjs';
@Injectable()
export class UsersService {

   constructor(
      @InjectModel('Users') private usersModel: mongoose.Model<UserDto>,
      // @InjectModel(Users.name) private usersModel: mongoose.Model<UserDto>,
      @InjectModel('Health') private healthSchema: mongoose.Model<UserDto>,
      // @InjectModel(Health.name) private healthSchema: mongoose.Model<UserDto>,
   ) { }

   // using testing perpuse
   // @Cron('* * * * * *') /// every second
   @Cron('0 10 * * * *	')
   handleCron() {
      console.log('Called when the current second is 45');
   }


   async healthCheck(): Promise<UserDto[]> {
      console.log('USER API SERVICE FUNCTION HALTH IS OK!');
      try {
         const testingData = await this.healthSchema.find();
         return testingData;
      } catch (error) {
         return error;
      }
   }

   async findAll(): Promise<UserDto[]> {
      try {
         const dataList = await this.usersModel.find();
         return dataList;
      } catch (error) {
         return error;
      }
   }

   async emailAlreadyExists(userDetails: UserDto): Promise<UserDto> {
      try {
         const emailExitResp = await this.usersModel.findOne({
            email: userDetails.email,
         });
         return emailExitResp
      } catch (error) {
         return error;
      }
   }

   async doSignIn(userLoginDetails: UserDto): Promise<UserDto> {
      try {
         const { email, password } = userLoginDetails;
         const user: UserDto = await this.usersModel.findOne({ email });
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

   async deleteUser(deleteUser: UserDto): Promise<UserDto> {
      const deletedUser = await this.usersModel.findByIdAndDelete(deleteUser);
      if (!deletedUser) {
         throw new NotFoundException(`User #${deleteUser} not found`);
      }
      return deletedUser;
   }

}
