import { ProductLineDto } from '../../product-lines/dto/product-line.dto';

import { ProductDto } from '../../products/dto/product.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here

  Transform,
  Type,
} from 'class-transformer';

export class CreateDiscountDto {
  @ApiProperty({
    required: false,
    type: () => [ProductLineDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductLineDto)
  @IsArray()
  productLine?: ProductLineDto[] | null;

  @ApiProperty({
    required: false,
    type: () => [ProductDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDto)
  @IsArray()
  product?: ProductDto[] | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate?: Date | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate?: Date | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  type?: string | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  value?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  name?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
