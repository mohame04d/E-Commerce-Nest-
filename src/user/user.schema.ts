
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<User>;

@Schema({timestamps:true})
export class User{
  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);  
