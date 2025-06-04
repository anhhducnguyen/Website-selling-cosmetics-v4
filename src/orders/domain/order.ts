import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  orderDate?: Date | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  totalAmount?: number | null;

  @ApiProperty({
    type: () => User,
    nullable: true,
  })
  user?: User | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
