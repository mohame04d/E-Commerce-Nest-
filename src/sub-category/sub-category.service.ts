import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SubCategory, subCategorySchema } from './sub-category.schema';
import { Model } from 'mongoose';

@Injectable()
export class SubCategoryService {
  constructor(@InjectModel('SubCategory') private subCategoryModel: Model<SubCategory>) {}
  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const subCategory = await this.subCategoryModel.findOne({
      name: createSubCategoryDto.name,
    });
    if (subCategory) throw new HttpException('subcategory already exist', 400);
    const newSubCategory = await this.subCategoryModel.create(createSubCategoryDto);
    return {
      status: 201,
      message: 'subcategory created successfully',
      data: { newSubCategory },
    };
  }
  async findAll() {
     const subCategories = await this.subCategoryModel.find().populate('category','name').select('-__v');
    return {
      status:'200',
      result:subCategories.length,
      data:{subCategories}
    }
  }

  async findOne(id:string) {
    const subCategory = await this.subCategoryModel.findById(id).populate('category','name').select('-__v');
    if (!subCategory) throw new NotFoundException('subcategory not found');
    return {
      status:'200',
      data:{subCategory}
    }
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    const subCategory = await this.subCategoryModel.findById(id);
    if (!subCategory) throw new NotFoundException('subcategory not found');
    const updatedSubCategory = await this.subCategoryModel
      .findByIdAndUpdate(id, updateSubCategoryDto, { new: true })
      .select('-__v');
    return {
      status: 200,
      message: 'subcategory is updated',
      data: { updatedSubCategory },
    };
  }

  async remove(id:string) {
    const subCategory = await this.subCategoryModel.findById(id);
    if (!subCategory) throw new NotFoundException('subcategory not found');
    await this.subCategoryModel.deleteOne({_id:id});
    return {
      status:204,
      message:"subcategory deleted successfully"
    }
  }
}
