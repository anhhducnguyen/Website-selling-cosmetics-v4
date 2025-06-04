import { User } from '../../users/domain/user';
import { Product } from '../../products/domain/product';
import { ApiProperty } from '@nestjs/swagger';

export class Review {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  rating?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  reviewText?: string | null;

  @ApiProperty({
    type: () => User,
    nullable: true,
  })
  user?: User | null;

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
