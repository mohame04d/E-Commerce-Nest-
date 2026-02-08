import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type supplierDocument = HydratedDocument<Supplier>;
@Schema({ timestamps: true })
export class Supplier {
  @Prop({
    type: String,  
    minLength: [3, 'name must be at least 3 character'],
    maxLength:[30,'name must be at most 30 character'],
    required:[true,'name is required']
  })
  name: string;
  @Prop({
    type:String,
    required:[true,'website is required']
  })
  website: string;
}
export const supplierSchema = SchemaFactory.createForClass(Supplier);
