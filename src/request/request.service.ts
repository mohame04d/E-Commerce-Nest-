import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';            
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
import { SupplyRequest, SupplyRequestDocument } from './request.schema';

@Injectable()
export class RequestService {
  constructor(@InjectModel('SupplyRequest') private requestModel: Model<SupplyRequest>) {}
  async create(createRequestDto: CreateRequestDto) {
    const request = await this.requestModel.findOne({
          titleNeed: createRequestDto.titleNeed,
          user:createRequestDto.user
        });
        if (request) throw new HttpException('request already exist', 400);
        const newRequest = await this.requestModel.create(createRequestDto)
        return {
          status: 201,
          message: 'request created successfully',
          data: { newRequest },
        };
  }
  
  async findAll() {
    const requests = await this.requestModel.find();
    if(!requests.length)
      throw new NotFoundException('not found any request')
    return {
      status:200,
      data:{requests}
    }
  }

  async findOne(id: string) {
    const request = await this.requestModel.findById(id);
    if(!request)
      throw new NotFoundException('request not found')
    return{
      status:200,
      data: {request}
    }
  }
  
  async update(id: string, updateRequestDto: UpdateRequestDto) {
     const request = await this.requestModel.findById(id);
    if(!request)
      throw new NotFoundException('request not found')
 const updatedRequest = await this.requestModel
      .findByIdAndUpdate(id, updateRequestDto, { new: true })
      .select('-__v'); 
      return {
        status:204,
        data:{updatedRequest}
      }
     }


  async remove(id: string) {
      const request = await this.requestModel.findById(id);
    if(!request)
      throw new NotFoundException('request not found')
 const updatedRequest = await this.requestModel
      .findByIdAndDelete(id)
      return {
        status:204
      }
  }
}
