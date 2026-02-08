import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { supplierSchema } from './supplier.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Supplier', schema: supplierSchema }]),
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}