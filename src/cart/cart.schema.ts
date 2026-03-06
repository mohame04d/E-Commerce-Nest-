import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/product.schema';
import { User } from 'src/user/user.schema';

export type cartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
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
          default: 1,
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
    required: true,
  })
  totalPrice: number;
  @Prop({
    type: Number,
  })
  totalPriceAfterDiscount: number;

  @Prop({
    type: [
      {
        name: {
          type: String,
        },
        couponId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Coupon',
        },
      },
    ],
  })
  coupons: {
      name: string;
      couponId: string;
    }[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: string;
}

export const cartSchema = SchemaFactory.createForClass(Cart);
