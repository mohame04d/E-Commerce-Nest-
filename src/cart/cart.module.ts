import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, cartSchema } from './cart.schema';
import { Product, productSchema } from 'src/product/product.schema';
import { Coupon, couponSchema } from 'src/Coupon/coupon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Cart',
        schema: cartSchema,
      },
      {
        name: 'Product',
        schema: productSchema,
      },
      {
        name: 'Coupon',
        schema: couponSchema,
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}