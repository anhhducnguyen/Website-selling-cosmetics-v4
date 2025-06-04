import { Order } from '../../orders/domain/order';
import { Product } from '../../products/domain/product';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDetail {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  quantity?: number | null;

  @ApiProperty({
    type: () => Order,
    nullable: true,
  })
  order?: Order | null;

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
