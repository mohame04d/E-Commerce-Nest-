import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto} from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Coupon, couponSchema } from './coupon.schema';
import { Model } from 'mongoose';

@Injectable()
export class CouponService {
  constructor(@InjectModel('Coupon') private couponModel: Model<Coupon>) {}
  async create(createCouponDto: CreateCouponDto) {
    const coupon = await this.couponModel.findOne({
      name: createCouponDto.name,
    });
    if (coupon) throw new HttpException('coupon already exist', 400);
    if (createCouponDto.ExpireDate < new Date())
      throw new HttpException('Date must be a future date', 400);

    const newCoupon = await this.couponModel.create(createCouponDto);
    return {
      status: 201,
      message: 'coupon created successfully',
      data: { newCoupon },
    };
  }
  async findAll() {
     const coupons = await this.couponModel.find().select('-__v');
    return {
      status:'200',
      result:coupons.length,
      data:{coupons}
    }
  }

  async findOne(id:string) {
    const coupon = await this.couponModel.findById(id).select('-__v');
    if (!coupon) throw new NotFoundException('coupon not found');
    return {
      status:'200',
      data:{coupon}
    }
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.couponModel.findById(id);
    if (!coupon) throw new NotFoundException('coupon not found');
    const updatedCoupon = await this.couponModel
      .findByIdAndUpdate(id, updateCouponDto, { new: true })
      .select('-__v');
    return {
      status: 200,
      message: 'coupon is updated',
      data: { updatedCoupon },
    };
  }

  async remove(id:string) {
    const coupon = await this.couponModel.findById(id);
    if (!coupon) throw new NotFoundException('coupon not found');
    await this.couponModel.deleteOne({_id:id});
    return {
      status:204,
      message:"coupon deleted successfully"
    }
  }
}
