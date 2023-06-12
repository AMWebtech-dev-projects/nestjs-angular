import { Field, ObjectType } from "@nestjs/graphql";
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true })
@ObjectType()
export class UserGraphqlModel {

   @Field(() => String)
   _id: MongooseSchema.Types.ObjectId;

   @Prop()
   @Field(() => String)
   firstName: string;

   @Prop()
   @Field(() => String)
   lastName: string;

   @Prop()
   @Field(() => String)
   email: string;

   @Prop()
   @Field()
   phoneNumber: String;

   @Prop()
   @Field()
   password: String;

   @Prop()
   @Field()
   gender: String;

   @Prop()
   @Field()
   dob: String;

   @Prop()
   @Field()
   role: String;

   @Prop()
   @Field()
   status: Number;

   @Prop()
   @Field()
   authorization: String;

   @Prop()
   @Field()
   createdAt: Date;

   @Prop()
   @Field()
   updatedAt: Date;

   @Prop()
   @Field()
   forgotStatus: String;

   // @Prop()
   // @Field()
   // profileImage: String;

   // @Prop()
   // @Field()
   // forgotLink: String;

   // @Prop()
   // @Field()
   // skills: String;

   // @Prop()
   // @Field()
   // teckStack: String;
}

export const UserSchema = SchemaFactory.createForClass(UserGraphqlModel);


