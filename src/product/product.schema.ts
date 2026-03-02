import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
import { title } from 'process';
export type CategoryDocument = HydratedDocument<Product>;
@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: String,  
    minLength: [3, 'title must be at least 3 character'],
    required:[true,'title is required']
  })
  title: string;
  @Prop({
    type:String,
    minLength:[20,'description must be at least 20 character'],
    required:[true,'description must be required']
  })
  description:string
  @Prop({
    type:Number,
    min:[1,'quantity must be al least 1'],
    max:[500,'quantity must be at most 500'],
    default:1,
    required:[true,'quantity must be required']
  })
  quantity:number
  @Prop({
    type:String,
    required:[true,'imageCover must be required']
  })
  imageCover:string
  @Prop({
    type:String
  })
  images:string[]
  @Prop({
    type:Number,
    default:1
  })
  sold:number
  @Prop({
    type:Number,
    min:[1,'price must be at least 1'],
    max:[20000,'price must be at most 20000'],
    default:0,
    required:[true,'price must be required']
  })
  price:number
  @Prop({
    type:Number,
    min:[1,'price must be at least 1'],
    max:[20000,'price must be at most 20000'],
  })
  priceAfterDiscount:number
  @Prop({
    type:String
  })
  color:string
  @Prop({
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required:[true,'category must be required']
  })
  category:string
  @Prop({
    type:mongoose.Schema.Types.ObjectId,
    ref:'subCategory',
  })
  subCategory:string
   @Prop({
    type:mongoose.Schema.Types.ObjectId,
    ref:'Brand',
  })
  brand:string
  @Prop({
    type:Number,
    default:0
  })
  ratingAverage:number
  @Prop({
    type:Number,
    default:0
    })
    ratingQuantity:number
}
export const productSchema = SchemaFactory.createForClass(Product);
