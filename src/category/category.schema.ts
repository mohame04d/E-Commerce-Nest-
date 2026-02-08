import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type CategoryDocument = HydratedDocument<Category>;
@Schema({ timestamps: true })
export class Category {
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
export const categorySchema = SchemaFactory.createForClass(Category);
