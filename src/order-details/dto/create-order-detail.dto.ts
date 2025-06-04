import { OrderDto } from '../../orders/dto/order.dto';

import { ProductDto } from '../../products/dto/product.dto';

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
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateOrderDetailDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number | null;

  @ApiProperty({
    required: false,
    type: () => OrderDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OrderDto)
  @IsNotEmptyObject()
  order?: OrderDto | null;

  @ApiProperty({
    required: false,
    type: () => ProductDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDto)
  @IsNotEmptyObject()
  product?: ProductDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
