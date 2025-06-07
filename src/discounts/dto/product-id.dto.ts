// domain/product-id.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ProductIdDto {
  @ApiProperty()
  id: string;
}
