// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// @Schema({
//    timestamps: true
// })
// export class Users {

//    @Prop({ type: String, required: true, trim: true })
//    firstName: String

//    @Prop({ type: String, required: true, trim: true })
//    lastName: String

//    @Prop({ type: String, required: true, unique: true, trim: true })
//    email: String

//    @Prop({ required: true, trim: true })
//    phoneNumber: Number

//    @Prop({ type: String, required: true, trim: true })
//    password: String

//    @Prop({ required: true, trim: true })
//    gender: String

//    @Prop({ required: true, trim: true })
//    dob: String

//    @Prop({ required: true, trim: true })
//    role: String

//    @Prop({ required: true, trim: true })
//    status: Number

//    @Prop({ trim: true })
//    profileImage: String

//    @Prop({ trim: true })
//    forgotLink: String

//    @Prop()
//    forgotStatus: Number

//    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skills' }]

//    teckStack: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TechStack' }]

// }

// export const UsersSchema = SchemaFactory.createForClass(Users);

// export class Health {

//    @Prop({ type: String, required: true, trim: true })
//    healthStatus: String
// }

// export const HealthSchema = SchemaFactory.createForClass(Health);

export const HealthSchema = new mongoose.Schema({
   healthStatus: {
      type: String,
      required: true
   },
}, {
   timestamps: true
})

export interface Health {
   _id: string;
   healthStatus: string;
}
var Any = mongoose.Schema.Types.Mixed;


export const UsersSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   phoneNumber: {
      type: Number,
      required: true,
      trim: true
   },
   password: {
      type: String,
      required: true,
      trim: true
   },
   gender: {
      type: String,
      required: true,
      trim: true
   },
   dob: {
      type: String,
      required: true,
      trim: true
   },
   role: {
      type: String,
      required: true,
      trim: true
   },
   status: {
      type: Number,
      required: true,
      trim: true
   },
   profileImage: {
      type: Any,
      trim: true
   },
   forgotLink: {
      type: String,
      trim: true
   },
   forgotStatus: {
      type: Number
   },
   skills: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skills'
   }],
   techStack: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TechStack'
   }]
}, {
   timestamps: true
});

export interface Users {
   _id: string;
   firstName: string;
   lastName: string;
   email: string;
   phoneNumber: number;
   password: string;
   gender: string;
   dob: string;
   role: string;
   status: number;
   profileImage: string;
   forgotLink: string;
   forgotStatus: number;
}



