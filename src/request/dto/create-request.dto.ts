import {
  IsString,  
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsNumber,
  Min,
  isString,
} from 'class-validator';
import { Types } from 'mongoose';
export class CreateRequestDto {
  @IsString({ message: 'name must be string' })
  @IsNotEmpty({ message: 'name must be required' })
  titleNeed: string;
  @IsString({ message: 'details must be string' })
  @MinLength(3, { message: 'details must be at least 5 scharacters' })
  @IsNotEmpty({ message: 'details must be required' })
  details:string;
  @IsNumber({},{message:'quantity must be number'})
  @Min(1,{message:'quantity must be at least 1'})
  @IsNotEmpty({ message: 'quantity must be required' })
  quantity:number
 @IsString({ message: 'category must be string' })
 category:string
 @IsString({ message: 'user must be string' })
 user:Types.ObjectId
}
