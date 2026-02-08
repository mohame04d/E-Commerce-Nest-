import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';
export class CreateCategoryDto {
  @IsString({ message: 'name must be string' })
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @MaxLength(30, { message: 'name must be at most 30' })
  @IsNotEmpty({ message: 'name must be required' })
  name: string;
  @IsString({ message: 'avatar must be string' })
  @IsUrl({}, { message: 'image must be a valid URL' })
  @IsOptional()
  avatar: string;
}
