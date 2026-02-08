import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SupplyRequestDocument = HydratedDocument<SupplyRequest>;

@Schema({ timestamps: true })
export class SupplyRequest {

  @Prop({
    type: String,
    required: [true, 'titleNeed is required'],
    trim: true,
  })
  titleNeed: string;

  @Prop({
    type: String,
    minlength: [5, 'details must be at least 5 characters'],
    required: [true, 'details is required'],
  })
  details: string;

  @Prop({
    type: Number,
    required: [true, 'quantity is required'],
    min: [1, 'quantity must be at least 1'],
  })
  quantity: number;

  @Prop({ type: String })
  category: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: Types.ObjectId;
}

export const SupplyRequestSchema = SchemaFactory.createForClass(SupplyRequest);
