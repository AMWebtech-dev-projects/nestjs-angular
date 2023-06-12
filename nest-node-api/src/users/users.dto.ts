import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsNumber, IsString, MaxLength, IsEmail, MinLength } from "class-validator";

export class UsersDto {

   @IsString()
   @MaxLength(30)
   @IsNotEmpty()
   _id?: string;

   @IsString()
   @MinLength(1)
   @MaxLength(30)
   @IsNotEmpty()
   firstName: string;

   @IsString()
   @MinLength(1)
   @MaxLength(30)
   @IsNotEmpty()
   lastName: string;

   @IsEmail({}, { message: 'Please Enter the correct email address' })
   @IsNotEmpty()
   email: string;

   @IsNumber()
   @IsNotEmpty()
   phoneNumber: number;

   @IsString()
   @IsNotEmpty()
   @MaxLength(30)
   @MinLength(6)
   password: string;

   @IsString()
   gender: string;

   @IsString()
   dob: string;

   @IsString()
   role: string;

   @IsNumber()
   status: number;

   @IsString()
   profileImage: string;

   @IsString()
   profileOldImage: string;

   @IsString()
   forgotLink: string;

   forgotStatus?: number;

   remember?: boolean;

   updatedAt?: Date;

   createdAt?: Date;

   userId: string;

   @IsString()
   skills: any[] = [];

   @IsString()
   techStack: any[] = [];

}

export class UserDto extends PartialType(UsersDto) { }




