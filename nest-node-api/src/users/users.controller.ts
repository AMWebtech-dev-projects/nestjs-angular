import { Body, Controller, Get, MessageEvent, Sse, UseGuards, UseInterceptors } from '@nestjs/common';
import { Post, Req, Res, HttpStatus } from '@nestjs/common';
import { UploadedFile, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GlobalService } from 'src/core/global.service';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Skills } from './skills.model';
import { UserDto } from './users.dto';
import { Users } from './users.model';
import * as mongoose from 'mongoose';
import { diskStorage } from 'multer';
import * as bcrypt from 'bcrypt';
import { TechStack } from './techStack.model';
import { AuthGuard } from 'src/core/auth/auth.guard';
import { SocketChatGateway } from 'src/chat/socket-chat/socket-chat.gateway';
import { Cron } from '@nestjs/schedule';
import { interval, map, Observable } from 'rxjs';

class VerifyToken { verify: boolean }

@Controller('users')
export class UsersController {

   constructor(
      private jwtService: JwtService,
      private globalService: GlobalService,
      // private _SocketChatGateway: SocketChatGateway,
      private readonly usersService: UsersService,
      @InjectModel('Users') private usersModel: mongoose.Model<Users>,
      // @InjectModel(Users.name) private usersModel: mongoose.Model<Users>,
      @InjectModel('Skills') private slillsModel: mongoose.Model<Skills>,
      // @InjectModel(Skills.name) private slillsModel: mongoose.Model<Skills>,
      @InjectModel('TechStack') private techStackModel: mongoose.Model<TechStack>,
      // @InjectModel(TechStack.name) private techStackModel: mongoose.Model<TechStack>,
   ) { }

   // @Cron('* * * * * *')
   // handleCron() {
   //    console.log('test Called when the current second is 45');
   // }

   @Sse('sse')
   sse(): Observable<MessageEvent> {
      console.log('subscribe event....')
      return interval(5000).pipe(map((_) => ({
         data: { hello: 'without socket event' }
      }
      )));
   }


   @Get('/healthCheck')
   async healthCheck(@Req() req: Request, @Res() res: Response) {
      console.log('USER API CONTROLLER FUNCTION HALTH IS OK!');
      const apiHealth = req.body;
      if (apiHealth) {
         res.json({
            status: HttpStatus.OK,
            message: "Healthy Function into user controller!",
            data: apiHealth,
         });
      } else {
         res.json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Un-Healthy function",
            data: apiHealth,
         });
      }
      return this.usersService.healthCheck();
   }

   // @UseGuards(AuthGuard)
   @Get('/getUsersList')
   async getAllUsers(@Res() res: Response): Promise<Users[]> {
      const userDetails = await this.usersService.findAll();
      if (userDetails && userDetails.length) {
         res.json({
            status: HttpStatus.OK,
            message: "You have Get All users list successfully!",
            data: userDetails,
         });
      } else {
         res.json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "No data",
            data: userDetails,
         });
      }
      return;
   }

   // @UseGuards(AuthGuard)
   @Get('/getUsersListWithSkill')
   async getUsersListWithSkill(@Req() req: Request, @Res() res: Response): Promise<Users[]> {
      // console.log("req", req.session['currentUser'])
      const users = await this.usersModel.find().populate('skills').populate('techStack').select({ skills: 0, techStack: 0 });
      // const users = await this.usersModel.find().populate('skills').populate('techStack').select(['firstName', 'lastName', '-_id']);
      const skills = await this.slillsModel.find().populate('userId').select({ createdAt: 0, updatedAt: 0 });
      const techs = await this.techStackModel.find().populate('userId');
      if (users && users.length) {
         res.json({
            status: HttpStatus.OK,
            message: "You have Get All users list successfully!",
            users: users,
            skills: skills,
            techs: techs,
         });
      } else {
         res.json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "No data",
            data: users,
            techs: techs,
         });
      }
      return;
   }

   // @UseGuards(AuthGuard)
   @Get('/getUsersListWithTechStack')
   async getUsersListWithTechStack(@Req() req: any, @Res() res: Response): Promise<Users[]> {
      const userDetails = await this.techStackModel.find().populate('userId');
      if (userDetails && userDetails.length) {
         res.json({
            status: HttpStatus.OK,
            message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: "You have Get All users list successfully!",
            data: userDetails,
         });
      } else {
         res.json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "No data",
            data: userDetails,
         });
      }
      return;
   }

   @Post('/saveUserInfoWithSkills')
   async saveUserInfoWithSkills(@Body() userDetailsDto: UserDto, @Req() req?: Request, @Res() res?: Response) {
      const postData = JSON.parse(JSON.stringify(userDetailsDto));
      postData.email = postData.email.toLowerCase();
      if (postData.password) {
         postData.password = await bcrypt.hash(postData.password, 10);
      }
      delete userDetailsDto.skills;
      delete userDetailsDto.techStack;
      // userDetailsDto.skills = [];
      // userDetailsDto.techStack = [];
      let userResp = await this.usersModel.create(userDetailsDto);
      console.log('postData into saveUserInfoWithSkills controller', postData);
      if (userResp._id) {
         console.log("postData.skills", postData.skills);
         for (let index = 0; index < postData.skills.length; index++) {
            let userSkill = { name: postData.skills[index], userId: userResp._id }
            let skillDetails = await this.slillsModel.create(userSkill);
            let updateSkill = await this.usersModel.findByIdAndUpdate(
               { _id: userResp._id },
               { $push: { skills: skillDetails._id } },
               { new: true, useFindAndModify: false }
            );
         }
      }
      if (userResp.id) {
         for (let i = 0; i < postData.techStack.length; i++) {
            let userTechStack = { name: postData.techStack[i], userId: userResp._id }
            let techDetails = await this.techStackModel.create(userTechStack);
            let updateTech = await this.usersModel.findByIdAndUpdate(
               { _id: userResp._id },
               { $push: { techStack: techDetails._id } },
               { new: true, useFindAndModify: false }
            );
         }
      }
      try {
         if (userResp) {
            return res.json({
               message: "User Account Created Successfuly.",
               status: HttpStatus.OK,
               data: userResp,
            });
         } else {
            return res.json({
               message: "Failed to create account.",
               status: HttpStatus.INTERNAL_SERVER_ERROR,
               error: "Getting issue while creating user account.",
            });
         }
      } catch (error) {
         return res.json({
            message: "Failed to create an user account.",
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message,
         });
      }
   }

   @Post('/saveUserInfo')
   async saveUser(@Body() userDetailsDto: UserDto, @Req() req?: Request, @Res() res?: Response) {
      const postData = userDetailsDto;
      if (postData.password) {
         postData.password = await bcrypt.hash(postData.password, 10);
      }
      if (postData._id) {
         postData.updatedAt = new Date();
         if (postData.profileOldImage) {
            this.globalService.removeFile(postData.profileOldImage, () => { });
         }
         let createdUser = await this.usersModel.updateOne({ _id: postData._id, }, postData);
         try {
            if (createdUser) {
               let checkPassword = postData.password;
               delete postData.password;
               return res.json({
                  status: HttpStatus.OK,
                  message: checkPassword
                     ? "Your password has been changed successfully."
                     : "User Profile Updated successfully.",
                  data: postData,
               });
            } else {
               return res.json({
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                  message: "There are some error while update.",
                  data: createdUser,
               });
            }
         } catch (error) {
            return res.json({
               status: HttpStatus.INTERNAL_SERVER_ERROR,
               message: "There are some error while update.",
               data: error,
            });
         }
      } else {
         let userResp = await this.usersModel.create(userDetailsDto)
         try {
            if (userResp) {
               return res.json({
                  message: "User Account Created Successfuly.",
                  status: HttpStatus.OK,
                  data: userResp,
               });
            } else {
               return res.json({
                  message: "Failed to create account.",
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                  error: "Getting issue while creating user account.",
               });
            }
         } catch (error) {
            return res.json({
               message: "Failed to create an user account.",
               status: HttpStatus.INTERNAL_SERVER_ERROR,
               error: error.message,
            });
         }
      }
   }

   @Post('/profilePicture')
   @UseInterceptors(FileInterceptor('profileImage', {
      storage: diskStorage({
         destination: './photos/upload/profile',
         filename: (req, file, callback) => {
            var fileName = file.originalname;
            callback(null, Date.now() + "-" + fileName);
         }
      })
   }))
   async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() userDetails: UserDto, @Res() res: Response) {
      if (!file.path) {
         return 'Please re-try to upload profile image';
      }
      var fileUploadPath = `${URL}/upload/profile/${file.filename}`;
      userDetails.profileImage = fileUploadPath;
      if (userDetails.password) {
         userDetails.password = await bcrypt.hash(userDetails.password, 10);
      }
      userDetails.email = userDetails.email.toLowerCase();
      let userResp = await this.usersModel.create(userDetails)
      try {
         if (userResp) {
            return res.json({
               message: "User Account Created Successfuly.",
               status: HttpStatus.OK,
               data: userResp,
            });
         } else {
            return res.json({
               message: "Failed to create account.",
               status: HttpStatus.INTERNAL_SERVER_ERROR,
               error: "Getting issue while creating user account.",
            });
         }
      } catch (error) {
         return res.json({
            message: "Failed to create an user account.",
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message,
         });
      }
   }

   @Post('/doSignIn')
   async doSignIn(@Body() userDetails: UserDto, @Req() request: Request, @Res() res: Response) {
      delete userDetails.remember;
      userDetails.email = userDetails.email.toLowerCase();
      let usersDetails = await this.usersService.doSignIn(userDetails);
      usersDetails = JSON.parse(JSON.stringify(usersDetails));
      try {
         if (usersDetails && usersDetails._id) {
            usersDetails['authorization'] = await this.jwtService.signAsync({ id: usersDetails._id });
            delete usersDetails.password;
            request.session['currentUser'] = usersDetails;
            if (usersDetails.status) {
               res.json({
                  status: HttpStatus.OK,
                  message: "You have signIn successfully!",
                  data: usersDetails,
               });
            } else {
               res.json({
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                  message: "Your account is deactivated. Please contact to Admin Department",
                  data: usersDetails,
               });
            }
         } else {
            res.json({
               status: HttpStatus.UNAUTHORIZED,
               message: "Please provide valid email or password!",
               data: usersDetails,
            });
         }
      } catch (error) {
         res.json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "You have signin failed!",
            data: usersDetails,
         });
      }
      return;
   }

   @Post('/authentication')
   async authentication(@Req() req: Request, @Res() res: Response) {
      if (req.headers) {
         const headers: any = req.headers;
         const authorization = headers.authorization.split(" ")[1];
         this.globalService.verifyToken(authorization, (verifyResp: VerifyToken) => {
            if (verifyResp.verify) {
               return res.json({
                  status: HttpStatus.OK,
                  message: "Api authenticated Successfully.",
                  currentUser: true,
               });
            } else {
               return res.json({
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                  message: "Authentication failed.",
                  currentUser: null,
               });
            }
         });
      } else {
         return res.json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Authentication failed.",
            currentUser: null,
         });
      }
   }

   @Get('/logout')
   logout(@Req() req) {
      req.session.destroy();
      return { message: 'The user session has ended' }
   }

   @Post('/emailAlreadyExists')
   async emailAlreadyExists(@Body() emailAlreadyExistsDto: UserDto, @Res() res: Response) {
      emailAlreadyExistsDto.email = emailAlreadyExistsDto.email.toLowerCase();
      var userDetails = await this.usersService.emailAlreadyExists(emailAlreadyExistsDto);
      if (userDetails) {
         return res.json({
            status: HttpStatus.OK,
            message: "This Email Already Exists, please try another one.",
            data: userDetails,
         });
      } else {
         return res.json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "No Email Found.",
            data: userDetails,
         });
      }
   }

   @Post('/deleteUser')
   async deleteUser(@Req() req: Request, @Res() res: Response) {
      const postData = req.body;
      const whereObj = {
         _id: postData._id,
      };
      const userDelete = await this.usersModel.deleteOne(whereObj);

      try {
         if (userDelete.deletedCount === 1) {
            return res.json({
               message: "User Delete Successfully.",
               status: HttpStatus.OK,
               data: postData
            });
         } else {
            return res.json({
               message: "There are some error while deleting...",
               status: HttpStatus.INTERNAL_SERVER_ERROR,
               data: postData
            });
         }
      } catch (err) {
         return res.json({
            message: "There are some error while deleting...",
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            data: err
         });
      }
   }

   @Post('/forgotPassword')
   async forgotPassword(@Body() postData: UserDto, @Req() req: Request, @Res() res) {
      const email = postData.email.toLowerCase();
      if (email) {
         var whereObj = { email: postData.email, };
         const user = await this.usersModel.findOne({ email });
         if (user && user._id) {
            const rString = this.globalService.generateString();
            const forgotResp = await this.usersModel.findOneAndUpdate(
               { _id: user._id, },
               { forgotLink: rString, forgotStatus: 1, }
            )
            if (forgotResp && forgotResp._id) {
               const linkParam =
                  process.env.WEBSITE_URL + "recoverpassword/" + user._id + "/" + rString;
               var prepareEmailConfig = {
                  email: user.email, firstName: this.globalService.capitalize(user.firstName),
                  markerData: {
                     name: this.globalService.capitalize(user.firstName),
                     websiteUrl: process.env.WEBSITE_URL,
                     recoverPasswordLink: linkParam,
                     fristname: user.firstName,
                  },
                  templatePath: "public/assets/emailtemplates/forgot-password.html",
                  subject: "Reset your password for AM.ONLINE your account",
                  html: "",
                  templateName: "forgot-password", // NEW
               };

               this.globalService.prepareEmailData(
                  prepareEmailConfig,
                  (resp: any) => {
                     return res.json({
                        status: HttpStatus.OK,
                        message: "Please check your email, Reset password link has been sent to " + user.email + ".", data: resp
                     });
                  }
               );
            } else {
               return res.json({
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                  message: "No account found with this email address : " + email + "."
               });
            }
         } else {
            return res.json({
               status: HttpStatus.INTERNAL_SERVER_ERROR,
               message: "No account found with this email address : " + email + "."
            });
         }
      } else {
         return res.json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "No account found with this email address : " + email + ".",
         });
      }
   }

   @Post('/getUserInfo')
   async getUserInfo(@Req() req: Request, @Body() postData: UserDto, @Res() res: Response) {
      if (postData.forgotLink && postData._id) {
         postData.forgotStatus = 1;
         try {
            let userDetails: UserDto = await this.usersModel.findOne(postData);
            if (userDetails) {
               let checkLinkExireTime = this.globalService.linkExpiryTimeCheck(
                  userDetails.updatedAt
               ); // HERE WE ARE CHECKING LINK TIME EXPIRATION.
               if (checkLinkExireTime) {
                  return res.json({
                     message: "Get the user info successfully.",
                     status: HttpStatus.OK,
                     data: userDetails,
                  });
               } else {
                  return res.json(this.globalService.linkExpiryError());
               }
            } else {
               return res.json(this.globalService.linkExpiryError());
            }
         } catch (error) {
            return res.json(this.globalService.linkExpiryError());
         }
      } else {
         return res.json(this.globalService.linkExpiryError());
      }
   };

   @Post('/getUsersListServer')
   async getUsersListServer(@Req() req: Request, @Res() res: Response) {
      const postData = req.body;
      const limit = parseInt(postData.length);
      const skip = postData.start;
      let orderDir = postData.order[0].dir === "asc" ? 1 : -1;
      //
      let orderField: any = {
         [postData.columns[postData.order[0].column].data]: orderDir,
      };

      let searchText = {
         $or: [{
            firstName: {
               $regex: new RegExp(
                  ".*" + postData.search.value.toLowerCase() + ".*",
                  "i"
               ),
            },
         },
         {
            lastName: {
               $regex: new RegExp(
                  ".*" + postData.search.value.toLowerCase() + ".*",
                  "i"
               ),
            },
         },
         {
            email: {
               $regex: new RegExp(
                  ".*" + postData.search.value.toLowerCase() + ".*",
                  "i"
               ),
            },
         },
         ],
      };

      try {
         const user = await this.usersModel.find(searchText).limit(limit).skip(skip).sort(orderField);
         const userLenght = await this.usersModel.countDocuments(searchText);
         return res.json({
            status: HttpStatus.OK,
            message: "Get the user list successfully.",
            data: {
               draw: postData.draw,
               recordsTotal: userLenght,
               recordsFiltered: userLenght,
               data: user,
            },
         });
      } catch (err) {
         return res.json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Some error occrred.",
            data: err,
         });
      }
   };
}
