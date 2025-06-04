import { Product } from '../../products/domain/product';
import { ApiProperty } from '@nestjs/swagger';

export class ProductImage {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  path?: string | null;

  @ApiProperty({
    type: () => Product,
    nullable: true,
  })
  product?: Product | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
