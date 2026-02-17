import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { productService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/user/decorators/user.decorators';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/user/guard/auth.gard';

@Controller('Product')
export class productController {
  constructor(private readonly productService: productService) {}

  @Post()
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  create(@Body(new ValidationPipe({forbidNonWhitelisted:true})) createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @Roles(['admin','user'])
  @UseGuards(AuthGuard)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body(new ValidationPipe({forbidNonWhitelisted:true})) updateProductDto: UpdateProductDto) {
    return this.productService.update( id,updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
