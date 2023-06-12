import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// @Schema({
//    timestamps: true
// })
// export class Skills {

//    @Prop({ type: mongoose.Types.ObjectId, ref: 'Users' })
//    userId: string

//    @Prop()
//    name: string

// }

// export const SkillsSchema = SchemaFactory.createForClass(Skills);

export const SkillsSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
   },
   name: {
      type: String,
      required: true
   }
}, {
   timestamps: true
})

export interface Skills {
   _id: string;
   userId: string
   name: string
}
