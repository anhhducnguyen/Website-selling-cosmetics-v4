import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateProductLineDto } from './dto/create-product-line.dto';
import { UpdateProductLineDto } from './dto/update-product-line.dto';
import { ProductLineRepository } from './infrastructure/persistence/product-line.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ProductLine } from './domain/product-line';

@Injectable()
export class ProductLinesService {
  constructor(
    // Dependencies here
    private readonly productLineRepository: ProductLineRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createProductLineDto: CreateProductLineDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.productLineRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.productLineRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ProductLine['id']) {
    return this.productLineRepository.findById(id);
  }

  findByIds(ids: ProductLine['id'][]) {
    return this.productLineRepository.findByIds(ids);
  }

  async update(
    id: ProductLine['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateProductLineDto: UpdateProductLineDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.productLineRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ProductLine['id']) {
    return this.productLineRepository.remove(id);
  }
}
