import { Module } from '@nestjs/common';
import { productService } from './product.service';
import { productController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
  ],
  controllers: [productController],
  providers: [productService],
})
export class ProductModule {}