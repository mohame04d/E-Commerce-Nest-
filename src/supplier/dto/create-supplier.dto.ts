import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';
export class CreateSupplierDto {
  @IsString({ message: 'name must be string' })
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @MaxLength(30, { message: 'name must be at most 30' })
  @IsNotEmpty({ message: 'name must be required' })
  name: string;
  @IsString({ message: 'website must be string' })
  @IsUrl({}, { message: 'website must be a valid URL' })
  @IsNotEmpty({ message: 'website must be required' })
  website: string;
}
