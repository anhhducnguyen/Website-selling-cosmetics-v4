import { ApiProperty } from '@nestjs/swagger';

import { Product } from '../../products/domain/product';

export class ProductLine {
  @ApiProperty({
    type: String,
  })
  id: string;

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

  products?: Product[] | null;
  // products?: {
  //   id: string;
  //   name?: string | null;
  // }[] | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
