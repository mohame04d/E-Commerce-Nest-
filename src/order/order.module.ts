import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CheckoutCardController,
  OrderCheckoutController,
  OrderForAdminController,
  OrderForUserController,
} from './order.controller';
import {  orderSchema } from './order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {  cartSchema } from 'src/cart/cart.schema';
import {  taxSchema } from 'src/tax/tax.schema';
import {  productSchema } from 'src/product/product.schema';
import { UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: orderSchema },
      { name: 'Cart', schema: cartSchema },
      { name: 'Tax', schema: taxSchema },
      { name: 'Product', schema: productSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [
    OrderCheckoutController,
    CheckoutCardController,
    OrderForUserController,
    OrderForAdminController,
  ],
  providers: [OrderService],
})
export class OrderModule {}