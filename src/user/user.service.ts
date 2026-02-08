import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { request } from 'express';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtServices: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(createUserDto.password, 12);
    const user = { password, role: createUserDto.role ?? 'user', active: true };
    const ifUserExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (ifUserExist) throw new HttpException('user already exist', 400);
    const createdUser = await this.userModel.create({
      ...createUserDto,
      ...user,
    });
    return {
      status: 201,
      data: createdUser,
    };
  }

  async findAll(query) {
    const {
      limit = 1000000,
      skip = 0,
      sort = 'asc',
      name,
      email,
      role,
    } = query;
    if (Number.isNaN(parseInt(limit)))
      return new HttpException('invalid limit', 400);
    if (Number.isNaN(parseInt(skip)))
      return new HttpException('invalid limit', 400);
    if (!['asc', 'desc'].includes(sort))
      return new HttpException('invalid sort', 400);
    const users = await this.userModel
      .find()
      .select('-password -__v')
      .skip(skip)
      .limit(limit)
      // .or([{name},{email},{role}])
      .where('name', new RegExp(`${name}`, 'i'))
      .where('email', new RegExp(`^${email}`, 'i'))
      .where('role', new RegExp(`^${role}`, 'i'))

      .sort({ name: sort });
    if (!users) return new NotFoundException('not found any users');
    return {
      status: 200,
      result: users.length,
      data: { users },
    };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select('-password -__v');
    if (!user) return new NotFoundException('user not found');
    return {
      status: 200,
      data: { user },
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id).select('-password -__v');
    if (!user) return new NotFoundException('user not found');
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
    }
    await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    return {
      status: 'success',
      data: { user },
    };
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) return new NotFoundException('user not found');
    return {
      status: 'success',
      data: null,
    };
  }
  async getMe(payload){
    if(!payload._id)
      throw new NotFoundException('user not found')
    const user = await this.userModel.findById(payload._id).select('-password -__v');
    if(!user)
      throw new NotFoundException('user not found');
      return {status:'success',
        data:{user}
      }
  }
  async updateMe(payload,updateUserDto:UpdateUserDto){
     if(!payload._id)
      throw new NotFoundException('user not found');
    const user = await this.userModel.findById(payload._id).select('-password -__v');
    if(!user)
      throw new NotFoundException('user not found');
    return{
      status:'success',
      data:await this.userModel.findByIdAndUpdate(payload._id,updateUserDto,{new:true}).select('-password -__v')
    }
  }
  async deleteMe(payload) :Promise<void>{
     if(!payload._id)
      throw new NotFoundException('user not found');
    const user = await this.userModel.findById(payload._id).select('-password -__v');
    if(!user)
      throw new NotFoundException('user not found');
      await this.userModel.findByIdAndUpdate(payload._id,{active:false},{new:true})
  }
}

