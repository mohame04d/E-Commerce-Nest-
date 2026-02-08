import { Module } from '@nestjs/common';
import {  CouponService } from './coupon.service';
import {  CouponController } from './coupon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { couponSchema } from './coupon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Coupon', schema: couponSchema }]),
  ],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}