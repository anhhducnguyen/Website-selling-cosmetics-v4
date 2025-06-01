import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductLineDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
