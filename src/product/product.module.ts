import { Module } from '@nestjs/common';
import { productService } from './product.service';
import { productController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './product.schema';
import { categorySchema } from 'src/category/category.schema';
import { subCategorySchema } from 'src/sub-category/sub-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'Category', schema: categorySchema },
      { name: 'SubCategory', schema: subCategorySchema },
    ]),
  ],
  controllers: [productController],
  providers: [productService],
})
export class ProductModule {}
