import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, mongo } from 'mongoose';
export type brandDocument = HydratedDocument<Brand>;
@Schema({ timestamps: true })
export class Brand {
  @Prop({
    type: String,  
    minLength: [3, 'name must be at least 3 character'],
    maxLength:[30,'name must be at most 30 character'],
    required:[true,'name is required']
  })
  name: string;
  @Prop({
    type:String
  })
  image:string
}
export const brandSchema = SchemaFactory.createForClass(Brand);
