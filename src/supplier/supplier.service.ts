import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Supplier } from './supplier.schema';
import { Model } from 'mongoose';

@Injectable()
export class SupplierService {
  constructor(@InjectModel('Supplier') private supplierModel: Model<Supplier>) {}
  async create(createSupplierDto: CreateSupplierDto) {
    const supplier = await this.supplierModel.findOne({
      name: createSupplierDto.name,
    });
    if (supplier) throw new HttpException('supplier already exist', 400);
    const newSupplier = await this.supplierModel.create(createSupplierDto);
    return {
      status: 201,
      message: 'supplier created successfully',
      data: { newSupplier },
    };
  }
  async findAll() {
     const suppliers = await this.supplierModel.find();
    return {
      status:'200',
      result:suppliers.length,
      data:{suppliers}
    }
  }

  async findOne(id:string) {
    const supplier = await this.supplierModel.findById(id);
    if (!supplier) throw new NotFoundException('supplier not found');
    return {
      status:'200',
      data:{supplier}
    }
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.supplierModel.findById(id);
    if (!supplier) throw new NotFoundException('supplier not found');
    const updatedSupplier = await this.supplierModel
      .findByIdAndUpdate(id, updateSupplierDto, { new: true })
      .select('-__v');
    return {
      status: 200,
      message: 'supplier is updated',
      data: { updatedSupplier },
    };
  }

  async remove(id:string) {
    const supplier = await this.supplierModel.findById(id)
    if (!supplier) throw new NotFoundException('supplier not found');
    await this.supplierModel.deleteOne({_id:id})
    return {
      status:204,
      message:"supplier deleted successfully"
    }
  }
}
