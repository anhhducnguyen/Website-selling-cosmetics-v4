import { ProductLinesService } from '../product-lines/product-lines.service';
import { ProductLine } from '../product-lines/domain/product-line';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Product } from './domain/product';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productLineService: ProductLinesService,

    // Dependencies here
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Do not remove comment below.
    // <creating-property />

    let productLine: ProductLine | null | undefined = undefined;

    if (createProductDto.productLine) {
      const productLineObject = await this.productLineService.findById(
        createProductDto.productLine.id,
      );
      if (!productLineObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            productLine: 'notExists',
          },
        });
      }
      productLine = productLineObject;
    } else if (createProductDto.productLine === null) {
      productLine = null;
    }

    return this.productRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      name: createProductDto.name,

      description: createProductDto.description,

      quantityInstock: createProductDto.quantityInstock,

      price: createProductDto.price,

      productLine,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.productRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Product['id']) {
    return this.productRepository.findById(id);
  }

  findByIds(ids: Product['id'][]) {
    return this.productRepository.findByIds(ids);
  }

  async update(
    id: Product['id'],

    updateProductDto: UpdateProductDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let productLine: ProductLine | null | undefined = undefined;

    if (updateProductDto.productLine) {
      const productLineObject = await this.productLineService.findById(
        updateProductDto.productLine.id,
      );
      if (!productLineObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            productLine: 'notExists',
          },
        });
      }
      productLine = productLineObject;
    } else if (updateProductDto.productLine === null) {
      productLine = null;
    }

    return this.productRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      name: updateProductDto.name,

      description: updateProductDto.description,

      quantityInstock: updateProductDto.quantityInstock,

      price: updateProductDto.price,

      productLine,
    });
  }

  remove(id: Product['id']) {
    return this.productRepository.remove(id);
  }
}
