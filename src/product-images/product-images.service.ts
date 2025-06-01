import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { ProductImageRepository } from './infrastructure/persistence/product-image.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ProductImage } from './domain/product-image';

@Injectable()
export class ProductImagesService {
  constructor(
    // Dependencies here
    private readonly productImageRepository: ProductImageRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createProductImageDto: CreateProductImageDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.productImageRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.productImageRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ProductImage['id']) {
    return this.productImageRepository.findById(id);
  }

  findByIds(ids: ProductImage['id'][]) {
    return this.productImageRepository.findByIds(ids);
  }

  async update(
    id: ProductImage['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateProductImageDto: UpdateProductImageDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.productImageRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ProductImage['id']) {
    return this.productImageRepository.remove(id);
  }
}
