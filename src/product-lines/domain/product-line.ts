import { ApiProperty } from '@nestjs/swagger';

export class ProductLine {
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
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
