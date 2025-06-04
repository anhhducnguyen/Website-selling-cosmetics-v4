import { ProductImage } from '../../product-images/domain/product-image';
import { ProductLine } from '../../product-lines/domain/product-line';
import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  name?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  quantityInstock?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  price?: number | null;

  @ApiProperty({
    type: () => ProductLine,
    nullable: true,
  })
  productLine?: ProductLine | null;

  @ApiProperty({
    type: () => ProductImage,
    nullable: true,
  })
  images?: ProductImage[];

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
