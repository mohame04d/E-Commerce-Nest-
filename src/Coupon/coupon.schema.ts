import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, mongo } from 'mongoose';    
export type couponDocument = HydratedDocument<Coupon>;
@Schema({ timestamps: true })
export class Coupon {
  @Prop({
    type: String,  
    minLength: [3, 'name must be at least 3 character'],
    maxLength:[30,'name must be at most 30 character'],
    required:[true,'name is required']
  })
  name: string;
  @Prop({
    type:Date,
    validate:{
      validator:function(value:Date){
        return value > new Date();  
      },
      message:'ExpireDate must be a future date'
    },
    required:[true,'ExpireDate is required']
  })
    ExpireDate:Date
    @Prop({
      type:Number,
      min:[0,'discount must be at least 0'],
      required:[true,'discount is required']
    })
    discount:number 
}
export const couponSchema = SchemaFactory.createForClass(Coupon);
