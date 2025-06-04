import { ProductLineDto } from '../../product-lines/dto/product-line.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  name?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  quantityInstock?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  price?: number | null;

  @ApiProperty({
    required: false,
    type: () => ProductLineDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductLineDto)
  @IsNotEmptyObject()
  productLine?: ProductLineDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
