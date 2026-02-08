import { Type } from 'class-transformer';
import {
  IsString,                                                                                                                                  
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsDate,
  IsNumber,
} from 'class-validator';
export class CreateCouponDto {
  @IsString({ message: 'name must be string' })
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @MaxLength(30, { message: 'name must be at most 30' })
  @IsNotEmpty({ message: 'name must be required' })
  name: string;
  @Type(() => Date)
  @IsDate({ message: 'ExpireDate must be a valid date' })
  @IsNotEmpty({ message: 'ExpireDate is required' })
  ExpireDate: Date
  @IsNumber({}, { message: 'discount must be a number' })
  @IsNotEmpty({ message: 'discount is required' })
  discount: number
}
