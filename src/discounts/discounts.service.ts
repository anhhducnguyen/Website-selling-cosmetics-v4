import { ProductLinesService } from '../product-lines/product-lines.service';
import { ProductLine } from '../product-lines/domain/product-line';

import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { DiscountRepository } from './infrastructure/persistence/discount.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Discount } from './domain/discount';

@Injectable()
export class DiscountsService {
  constructor(
    private readonly productLineService: ProductLinesService,

    private readonly productService: ProductsService,

    // Dependencies here
    private readonly discountRepository: DiscountRepository,
  ) {}

  async create(createDiscountDto: CreateDiscountDto) {
    // Do not remove comment below.
    // <creating-property />
    let productLine: ProductLine[] | null | undefined = undefined;

    if (createDiscountDto.productLine) {
      const productLineObjects = await this.productLineService.findByIds(
        createDiscountDto.productLine.map((entity) => entity.id),
      );
      if (productLineObjects.length !== createDiscountDto.productLine.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            productLine: 'notExists',
          },
        });
      }
      productLine = productLineObjects;
    } else if (createDiscountDto.productLine === null) {
      productLine = null;
    }

    let product: Product[] | null | undefined = undefined;

    if (createDiscountDto.product) {
      const productObjects = await this.productService.findByIds(
        createDiscountDto.product.map((entity) => entity.id),
      );
      if (productObjects.length !== createDiscountDto.product.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            product: 'notExists',
          },
        });
      }
      product = productObjects;
    } else if (createDiscountDto.product === null) {
      product = null;
    }

    return this.discountRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      productLine,

      product,

      endDate: createDiscountDto.endDate,

      startDate: createDiscountDto.startDate,

      type: createDiscountDto.type,

      value: createDiscountDto.value,

      name: createDiscountDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.discountRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Discount['id']) {
    return this.discountRepository.findById(id);
  }

  findByIds(ids: Discount['id'][]) {
    return this.discountRepository.findByIds(ids);
  }

  async update(
    id: Discount['id'],

    updateDiscountDto: UpdateDiscountDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let productLine: ProductLine[] | null | undefined = undefined;

    if (updateDiscountDto.productLine) {
      const productLineObjects = await this.productLineService.findByIds(
        updateDiscountDto.productLine.map((entity) => entity.id),
      );
      if (productLineObjects.length !== updateDiscountDto.productLine.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            productLine: 'notExists',
          },
        });
      }
      productLine = productLineObjects;
    } else if (updateDiscountDto.productLine === null) {
      productLine = null;
    }

    let product: Product[] | null | undefined = undefined;

    if (updateDiscountDto.product) {
      const productObjects = await this.productService.findByIds(
        updateDiscountDto.product.map((entity) => entity.id),
      );
      if (productObjects.length !== updateDiscountDto.product.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            product: 'notExists',
          },
        });
      }
      product = productObjects;
    } else if (updateDiscountDto.product === null) {
      product = null;
    }

    return this.discountRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      productLine,

      product,

      endDate: updateDiscountDto.endDate,

      startDate: updateDiscountDto.startDate,

      type: updateDiscountDto.type,

      value: updateDiscountDto.value,

      name: updateDiscountDto.name,
    });
  }

  remove(id: Discount['id']) {
    return this.discountRepository.remove(id);
  }
}
