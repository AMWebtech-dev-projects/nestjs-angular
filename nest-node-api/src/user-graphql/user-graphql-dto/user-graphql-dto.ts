import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from 'class-validator';

@InputType()
export class CreateUserGraphqlDto {

   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true })
   _id: String;

   @Field(() => String, { description: 'first name of the user' })
   firstName: string;

   @Field(() => String, { description: 'last name of the user' })
   lastName: string;

   @Field(() => String, { description: 'email of the user' })
   email: string;

   @Field(() => String, { description: 'phone number of the user' })
   phoneNumber: number;

   @Field(() => String, { description: 'password of the user' })
   password;

   @Field(() => String, { description: 'role of the user' })
   gender: String;

   @Field(() => String, { description: 'address of the user' })
   dob: String;

   @Field(() => String, { description: 'role of the user' })
   role: string;

   @Field(() => String, { description: 'status of the user' })
   status: Number;

   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true, description: 'status of the user' })
   forgotStatus: number;

   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true, description: 'status of the user' })
   updatedAt: Date;

   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true, description: 'status of the user' })
   createdAt: Date;
}

@InputType()
export class LoginUserGraphqlDto {
   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true })
   _id: String;

   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true })
   firstName: string;

   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true })
   lastName: string;

   @Field(() => String, { description: 'email of the user' })
   email: string;

   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true })
   phoneNumber: number;

   @Field(() => String, { description: 'password of the user' })
   password;

   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true })
   gender: String;

   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true })
   dob: String;

   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true })
   role: string;

   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true })
   status: Number;

   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true, description: 'status of the user' })
   forgotStatus: number;

   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true, description: 'status of the user' })
   updatedAt: Date;

   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true, description: 'status of the user' })
   createdAt: Date;
}

@InputType()
export class UpdateUserGraphqlDto {
   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true })
   _id: String;
   @Field(() => String, { description: 'first name of the user' })
   firstName: string;
   @Field(() => String, { description: 'last name of the user' })
   lastName: string;
   @Field(() => String, { description: 'email of the user' })
   email: string;
   @Field(() => String, { description: 'phone number of the user' })
   phoneNumber: number;
   @Field(() => String, { description: 'password of the user' })
   password;
   @Field(() => String, { description: 'role of the user' })
   gender: String;
   @Field(() => String, { description: 'address of the user' })
   dob: String;
   @Field(() => String, { description: 'role of the user' })
   role: string;
   @Field(() => String, { description: 'status of the user' })
   status: Number;
   // @Field(() => String, { description: 'profileImage of the user' })
   // @IsOptional()
   // profileImage: String;
   // @Field(() => String, { description: 'forgotLink of the user' })
   // @IsOptional()
   // forgotLink: String;
   // @Field(() => String, { description: 'skills of the user' })
   // @IsOptional()
   // skills: String;
   // @Field(() => String, { description: 'teckStack of the user' })
   // @IsOptional()
   // teckStack: String;
   @IsOptional()
   forgotStatus: number;
   @IsOptional()
   remember: boolean;
   @IsOptional()
   updatedAt: Date;
   @IsOptional()
   createdAt: Date;
}

@InputType()
export class ForgotPassword {
   @ApiProperty({ required: false, type: String, })
   @Field(() => String, { nullable: true })
   _id: String;
   @Field(() => String, { description: 'first name of the user' })
   firstName: string;
   @Field(() => String, { description: 'last name of the user' })
   lastName: string;
   @Field(() => String, { description: 'email of the user' })
   email: string;
   @Field(() => String, { description: 'phone number of the user' })
   phoneNumber: number;
   @Field(() => String, { description: 'password of the user' })
   password;
   @Field(() => String, { description: 'role of the user' })
   gender: String;
   @Field(() => String, { description: 'address of the user' })
   dob: String;
   @Field(() => String, { description: 'role of the user' })
   role: string;
   @Field(() => String, { description: 'status of the user' })
   status: Number;
   // @Field(() => String, { description: 'profileImage of the user' })
   // @IsOptional()
   // profileImage: String;
   // @Field(() => String, { description: 'forgotLink of the user' })
   // @IsOptional()
   // forgotLink: String;
   // @Field(() => String, { description: 'skills of the user' })
   // @IsOptional()
   // skills: String;
   // @Field(() => String, { description: 'teckStack of the user' })
   // @IsOptional()
   // teckStack: String;
   @IsOptional()
   forgotStatus: number;
   @IsOptional()
   remember: boolean;
   @IsOptional()
   updatedAt: Date;
   @IsOptional()
   createdAt: Date;
}
