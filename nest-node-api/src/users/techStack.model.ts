// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// @Schema({
//    timestamps: true
// })
// export class TechStack {

//    @Prop({ type: mongoose.Types.ObjectId, ref: 'Users' })
//    userId: string

//    @Prop()
//    name: string

// }

// export const TechStackSchema = SchemaFactory.createForClass(TechStack);

export const TechStackSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
   },
   name: {
      type: String
   }
}, {
   timestamps: true
})

export interface TechStack {
   _id: string;
   userId: string;
   name: string;
}

