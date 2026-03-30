import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type orderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  user: string;
  @Prop({
    type: String,
    required: false,
  })
  sessionId: string;
  @Prop({
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'Product',
          },
          quantity: {
            type: Number,
            required: true,
          },
          color: {
            type: String,
            default: '',
          },
        },
      ],
    })
    cartItems: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    color: string;
  }[];
  @Prop({
    type: Number,
    default: 0,
  })
  taxPrice: number;
  @Prop({
    type: Number,
    default: 0,
  })
  shippingPrice: number;
  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  totalOrderPrice: number;
  @Prop({
    type: String,
    default: 'card',
    enum: ['cash', 'card'],
  })
  paymentMethodType: string;
  @Prop({
    type: Boolean,
    default: false,
  })
  isPaid: boolean;
  @Prop({
    type: Date,
    required: false,
  })
  paidAt: Date;
  @Prop({
    type: Boolean,
    default: false,
  })
  isDeliverd: boolean;
  @Prop({
    type: Date,
  })
  deliverdAt: Date;
  @Prop({
    type: String,
  })
  shippingAddress: string;
}

export const orderSchema = SchemaFactory.createForClass(Order);