import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private categoryModel: Model<Category>) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (category) throw new HttpException('category already exist', 400);
    const newCategory = await this.categoryModel.create(createCategoryDto);
    return {
      status: 201,
      message: 'category created successfully',
      data: { newCategory },
    };
  }
  async findAll() {
     const categories = await this.categoryModel.find();
    return {
      status:'200',
      result:categories.length,
      data:{categories}
    }
  }

  async findOne(id:string) {
    const category = await this.categoryModel.findById(id);
    if (!category) throw new NotFoundException('category not found');
    return {
      status:'200',
      data:{category}
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findById(id);
    if (!category) throw new NotFoundException('category not found');
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .select('-__v');
    return {
      status: 200,
      message: 'category is updated',
      data: { updatedCategory },
    };
  }

  async remove(id:string) {
    const category = await this.categoryModel.findById(id)
    if (!category) throw new NotFoundException('category not found');
    await this.categoryModel.deleteOne({id:id})
    return {
      status:204,
      message:"category deleted successfully"
    }
  }
}
