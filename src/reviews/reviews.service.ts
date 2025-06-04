import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewRepository } from './infrastructure/persistence/review.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Review } from './domain/review';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly userService: UsersService,

    private readonly productService: ProductsService,

    // Dependencies here
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    // Do not remove comment below.
    // <creating-property />

    let user: User | null | undefined = undefined;

    if (createReviewDto.user) {
      const userObject = await this.userService.findById(
        createReviewDto.user.id,
      );
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    } else if (createReviewDto.user === null) {
      user = null;
    }

    let product: Product | null | undefined = undefined;

    if (createReviewDto.product) {
      const productObject = await this.productService.findById(
        createReviewDto.product.id,
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
    } else if (createReviewDto.product === null) {
      product = null;
    }

    return this.reviewRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      rating: createReviewDto.rating,

      reviewText: createReviewDto.reviewText,

      user,

      product,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.reviewRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Review['id']) {
    return this.reviewRepository.findById(id);
  }

  findByIds(ids: Review['id'][]) {
    return this.reviewRepository.findByIds(ids);
  }

  async update(
    id: Review['id'],

    updateReviewDto: UpdateReviewDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let user: User | null | undefined = undefined;

    if (updateReviewDto.user) {
      const userObject = await this.userService.findById(
        updateReviewDto.user.id,
      );
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    } else if (updateReviewDto.user === null) {
      user = null;
    }

    let product: Product | null | undefined = undefined;

    if (updateReviewDto.product) {
      const productObject = await this.productService.findById(
        updateReviewDto.product.id,
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
    } else if (updateReviewDto.product === null) {
      product = null;
    }

    return this.reviewRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      rating: updateReviewDto.rating,

      reviewText: updateReviewDto.reviewText,

      user,

      product,
    });
  }

  remove(id: Review['id']) {
    return this.reviewRepository.remove(id);
  }
}
