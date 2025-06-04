import { ProductsService } from '../products/products.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { ProductImageRepository } from './infrastructure/persistence/product-image.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ProductImage } from './domain/product-image';
import { Product } from '../products/domain/product';
@Injectable()
export class ProductImagesService {
  constructor(
    private readonly productService: ProductsService,

    // Dependencies here
    private readonly productImageRepository: ProductImageRepository,
  ) {}

  async create(createProductImageDto: CreateProductImageDto) {
    // Do not remove comment below.
    // <creating-property />

    let product: Product | null | undefined = undefined;

    if (createProductImageDto.product) {
      const productObject = await this.productService.findById(
        createProductImageDto.product.id,
      );
      if (!productObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            product: 'notExists',
          },
        });
      }
      product = productObject;
    } else if (createProductImageDto.product === null) {
      product = null;
    }

    return this.productImageRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      path: createProductImageDto.path,

      product,
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

    updateProductImageDto: UpdateProductImageDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let product: Product | null | undefined = undefined;

    if (updateProductImageDto.product) {
      const productObject = await this.productService.findById(
        updateProductImageDto.product.id,
      );
      if (!productObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            product: 'notExists',
          },
        });
      }
      product = productObject;
    } else if (updateProductImageDto.product === null) {
      product = null;
    }

    return this.productImageRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      path: updateProductImageDto.path,

      product,
    });
  }

  remove(id: ProductImage['id']) {
    return this.productImageRepository.remove(id);
  }
}
