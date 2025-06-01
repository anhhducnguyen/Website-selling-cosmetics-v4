// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateProductLineDto } from './create-product-line.dto';

export class UpdateProductLineDto extends PartialType(CreateProductLineDto) {}
