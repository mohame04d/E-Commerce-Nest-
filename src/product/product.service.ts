import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { APIFeatures } from 'src/utils/apiFeatures';
import { Category } from 'src/category/category.schema';
import { SubCategory } from 'src/sub-category/sub-category.schema';

@Injectable()
export class productService {
  constructor(
    @InjectModel('Product') private ProductModel: Model<Product>,
    @InjectModel('Category') private categoryModel: Model<Category>,
    @InjectModel('SubCategory') private subCategoryModel: Model<SubCategory>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.ProductModel.findOne({
      name: createProductDto.title,
    });
    if (product) throw new HttpException('Product already exist', 400);

    const category = await this.categoryModel.findById(
      createProductDto.category,
    );
    if (!category) throw new HttpException('category not exist', 400);

    const subCategory = await this.subCategoryModel.findById(
      createProductDto.subCategory,
    );
    if (!subCategory) throw new HttpException('subCategory not exist', 400);

    const newProduct = await this.ProductModel.create(createProductDto);
    return {
      status: 201,
      message: 'Product created successfully',
      data: { newProduct },
    };
  }
  async findAll(query: any) {
    const features = new APIFeatures(this.ProductModel.find(), query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .search();
    const products = await features.getQuery();
    return {
      status: '200',
      result: products.length,
      data: { products },
    };
  }

  async findOne(id: string) {
    const product = await this.ProductModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return {
      status: '200',
      data: { product },
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.ProductModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');

    const category = await this.ProductModel.findById(
      updateProductDto.category,
    );
    if (!category) throw new HttpException('category not exist', 400);

    const subCategory = await this.ProductModel.findById(
      updateProductDto.subCategory,
    );
    if (!subCategory) throw new HttpException('subCategory not exist', 400);

    const updatedProduct = await this.ProductModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    ).select('-__v');
    return {
      status: 200,
      message: 'Product is updated',
      data: { updatedProduct },
    };
  }

  async remove(id: string) {
    const product = await this.ProductModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    await this.ProductModel.deleteOne({ id: id });
    return {
      status: 204,
      message: 'Product deleted successfully',
    };
  }
}
