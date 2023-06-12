import { CreateUserGraphqlDto, LoginUserGraphqlDto } from './user-graphql-dto/user-graphql-dto';
import { UpdateUserGraphqlDto } from './user-graphql-dto/user-graphql-dto';
import { UserGraphqlModel } from './user-graphql-model/user-graphql-model';
import { ForgotPassword } from './user-graphql-dto/user-graphql-dto';
import { Body, HttpStatus, Logger, Req, Res } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserGraphqlService } from './user-graphql.service';
import { GlobalService } from './global/global.service';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

@Resolver(() => UserGraphqlModel)

export class UserGraphqlResolver {

   constructor(
      @InjectModel(UserGraphqlModel.name)
      private readonly userModel: Model<UserGraphqlModel>,
      private userService: UserGraphqlService,
      private globalService: GlobalService,
      private jwtService: JwtService,
   ) { }

   @Mutation(() => UserGraphqlModel)
   async saveUserInfo(
      @Args('saveUser') postData: CreateUserGraphqlDto,
      // @Args('updateUser') updateUser: UpdateUserGraphqlDto,
      // @Args('forgotPassword') forgotPassword: ForgotPassword,
      // @Res() res: Response
   ) {
      console.log("postData===========", postData);
      if (postData.password) {
         postData.password = await this.globalService.encryptPassword(postData.password);
      }
      if (postData._id) {
         postData.updatedAt = new Date();
         // if (postData.profileOldImage) {
         //    this.globalService.removeFile(postData.profileOldImage, () => { });
         // }
         await this.userModel.updateOne({ _id: postData._id, }, postData);
         // postData.status = true;
         return postData;
         // try {
         //    if (createdUser) {
         //       let checkPassword = postData.password;
         //       delete postData.password;
         //       return createdUser;
         //       // return res.json({
         //       //    status: HttpStatus.OK,
         //       //    message: checkPassword
         //       //       ? "Your password has been changed successfully."
         //       //       : "User Profile Updated successfully.",
         //       //    data: postData,
         //       // });
         //    } else {
         //       return HttpStatus.INTERNAL_SERVER_ERROR;
         //       // return res.json({
         //       //    status: HttpStatus.INTERNAL_SERVER_ERROR,
         //       //    message: "There are some error while update.",
         //       //    data: createdUser,
         //       // });
         //    }
         // } catch (error) {
         //    return HttpStatus.INTERNAL_SERVER_ERROR;
         //    // return res.json({
         //    //    status: HttpStatus.INTERNAL_SERVER_ERROR,
         //    //    message: "There are some error while update.",
         //    //    data: error,
         //    // });
         // }
      } else {
         delete postData._id;
         let response = await this.userModel.create(postData);
         return response;
      }
   }

   @Query(() => [UserGraphqlModel], { name: 'getAllUsers' })
   async findAll() {
      const allUsersList = await this.userService.findAll();
      Logger.log('USERSLIST', allUsersList);
      return allUsersList;
   }

   @Query(() => UserGraphqlModel, { name: 'user' })
   async findOne(@Args('_id', { type: () => String }) id: string) {
      return await this.userService.findOne(id);
   }

   @Mutation(() => UserGraphqlModel)
   async removeUser(@Args('_id', { type: () => String }) id: string) {
      return await this.userService.deleteUser(id);
   }

   @Mutation(() => UserGraphqlModel)
   async doSignIn(
      @Args('userLogin')
      userDetails: LoginUserGraphqlDto,
      @Req() req: Request,
      @Res() res: Response
   ) {
      console.log('1111111111111111111', userDetails);
      // delete userDetails.remember;

      userDetails.email = userDetails.email.toLowerCase();
      let usersDetails = await this.userService.doSignIn(userDetails);
      console.log('222222222222222222', usersDetails);

      // let usersDetail = await JSON.parse(JSON.stringify(usersDetails));
      usersDetails['authorization'] = await this.jwtService.signAsync({ id: usersDetails._id });
      // delete usersDetails.password;
      console.log('3333333333333', usersDetails);
      // req.session['currentUser'] = usersDetails;

      return usersDetails;
   }

   @Mutation(() => UserGraphqlModel)
   logout(@Body() userLogout: CreateUserGraphqlDto, @Req() req) {
      req.session.destroy();
      return { message: 'The user session has ended' }
   }
}


// method to implement custom responce in graphql with nestja?