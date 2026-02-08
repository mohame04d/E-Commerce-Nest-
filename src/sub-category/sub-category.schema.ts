import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, mongo } from 'mongoose';
export type SubCategoryDocument = HydratedDocument<SubCategory>;
@Schema({ timestamps: true })
export class SubCategory {
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
  @Prop({
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required:[true,'category id is required']
  })
  category:string
}
export const subCategorySchema = SchemaFactory.createForClass(SubCategory);
