import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { subCategorySchema } from './sub-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SubCategory', schema: subCategorySchema }]),
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}