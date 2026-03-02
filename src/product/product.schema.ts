import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type CategoryDocument = HydratedDocument<Product>;
@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: String,  
    minLength: [3, 'title must be at least 3 character'],
    maxLength:[30,'title must be at most 30 character'],
    required:[true,'title is required']
  })
  title: string;
  @Prop({
    type:String
  })
  image:string
}
export const productSchema = SchemaFactory.createForClass(Product);
