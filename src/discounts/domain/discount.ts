import { ProductLine } from '../../product-lines/domain/product-line';
import { Product } from '../../products/domain/product';
import { ApiProperty } from '@nestjs/swagger';
// import { ProductIdDto } from '../dto/product-id.dto';

export class Discount {
  @ApiProperty({
    type: () => [ProductLine],
    nullable: true,
  })
  productLine?: ProductLine[] | null;

  @ApiProperty({
    type: () => [Product],
    nullable: true,
  })
  product?: Product[] | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  endDate?: Date | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  startDate?: Date | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  type?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  value?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  name?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
