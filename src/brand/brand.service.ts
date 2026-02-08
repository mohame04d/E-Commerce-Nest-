import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto} from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Brand, brandSchema } from './brand.schema';
import { Model } from 'mongoose';

@Injectable()
export class BrandService {
  constructor(@InjectModel('Brand') private brandModel: Model<Brand>) {}
  async create(createBrandDto: CreateBrandDto) {
    const brand = await this.brandModel.findOne({
      name: createBrandDto.name,
    });
    if (brand) throw new HttpException('brand already exist', 400);
    const newBrand = await this.brandModel.create(createBrandDto);
    return {
      status: 201,
      message: 'brand created successfully',
      data: { newBrand },
    };
  }
  async findAll() {
     const brands = await this.brandModel.find().select('-__v');
    return {
      status:'200',
      result:brands.length,
      data:{brands}
    }
  }

  async findOne(id:string) {
    const brand = await this.brandModel.findById(id).select('-__v');
    if (!brand) throw new NotFoundException('brand not found');
    return {
      status:'200',
      data:{brand}
    }
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandModel.findById(id);
    if (!brand) throw new NotFoundException('brand not found');
    const updatedBrand = await this.brandModel
      .findByIdAndUpdate(id, updateBrandDto, { new: true })
      .select('-__v');
    return {
      status: 200,
      message: 'brand is updated',
      data: { updatedBrand },
    };
  }

  async remove(id:string) {
    const brand = await this.brandModel.findById(id);
    if (!brand) throw new NotFoundException('brand not found');
    await this.brandModel.deleteOne({_id:id});
    return {
      status:204,
      message:"brand deleted successfully"
    }
  }
}
