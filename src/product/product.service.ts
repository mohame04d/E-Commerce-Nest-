import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class productService {
  constructor(@InjectModel('Product') private ProductModel: Model<Product>) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.ProductModel.findOne({
      name: createProductDto.title,
    });
    if (product) throw new HttpException('Product already exist', 400);
    const newProduct = await this.ProductModel.create(createProductDto);
    return {
      status: 201,
      message: 'Product created successfully',
      data: { newProduct },
    };
  }
  async findAll() {
     const products = await this.ProductModel.find();
    return {
      status:'200',
      result:products.length,
      data:{products}
    }
  }

  async findOne(id:string) {
    const product = await this.ProductModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return {
      status:'200',
      data:{product}
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.ProductModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    const updatedProduct = await this.ProductModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .select('-__v');
    return {
      status: 200,
      message: 'Product is updated',
      data: { updatedProduct },
    };
  }

  async remove(id:string) {
    const product = await this.ProductModel.findById(id)
    if (!product) throw new NotFoundException('Product not found');
    await this.ProductModel.deleteOne({id:id})
    return {
      status:204,
      message:"Product deleted successfully"
    }
  }
}
