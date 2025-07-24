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
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository } from './infrastructure/persistence/cart.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Cart } from './domain/cart';

@Injectable()
export class CartsService {
  constructor(
    private readonly userService: UsersService,

    private readonly productService: ProductsService,

    // Dependencies here
    private readonly cartRepository: CartRepository,
  ) {}

  async create(createCartDto: CreateCartDto) {
    // Do not remove comment below.
    // <creating-property />

    let user: User | null | undefined = undefined;

    if (createCartDto.user) {
      const userObject = await this.userService.findById(createCartDto.user.id);
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    } else if (createCartDto.user === null) {
      user = null;
    }

    let product: Product | null | undefined = undefined;

    if (createCartDto.product) {
      const productObject = await this.productService.findById(
        createCartDto.product.id,
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
    } else if (createCartDto.product === null) {
      product = null;
    }

    return this.cartRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      quantity: createCartDto.quantity,

      user,

      product,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.cartRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Cart['id']) {
    return this.cartRepository.findById(id);
  }

  findByIds(ids: Cart['id'][]) {
    return this.cartRepository.findByIds(ids);
  }

  async update(
    id: Cart['id'],

    updateCartDto: UpdateCartDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let user: User | null | undefined = undefined;

    if (updateCartDto.user) {
      const userObject = await this.userService.findById(updateCartDto.user.id);
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    } else if (updateCartDto.user === null) {
      user = null;
    }

    let product: Product | null | undefined = undefined;

    if (updateCartDto.product) {
      const productObject = await this.productService.findById(
        updateCartDto.product.id,
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
    } else if (updateCartDto.product === null) {
      product = null;
    }

    return this.cartRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      quantity: updateCartDto.quantity,

      user,

      product,
    });
  }

  remove(id: Cart['id']) {
    return this.cartRepository.remove(id);
  }

  async countTotalQuantityByUser(): Promise<number> {
    return this.cartRepository.countTotalQuantityByUser(2);
  }
}
