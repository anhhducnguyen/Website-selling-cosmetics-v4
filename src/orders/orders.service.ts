import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './infrastructure/persistence/order.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Order } from './domain/order';

@Injectable()
export class OrdersService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // Do not remove comment below.
    // <creating-property />

    let user: User | null | undefined = undefined;

    if (createOrderDto.user) {
      const userObject = await this.userService.findById(
        createOrderDto.user.id,
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
    } else if (createOrderDto.user === null) {
      user = null;
    }

    return this.orderRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      orderDate: createOrderDto.orderDate,

      status: createOrderDto.status,

      totalAmount: createOrderDto.totalAmount,

      user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Order['id']) {
    return this.orderRepository.findById(id);
  }

  findByIds(ids: Order['id'][]) {
    return this.orderRepository.findByIds(ids);
  }

  async update(
    id: Order['id'],

    updateOrderDto: UpdateOrderDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let user: User | null | undefined = undefined;

    if (updateOrderDto.user) {
      const userObject = await this.userService.findById(
        updateOrderDto.user.id,
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
    } else if (updateOrderDto.user === null) {
      user = null;
    }

    return this.orderRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      orderDate: updateOrderDto.orderDate,

      status: updateOrderDto.status,

      totalAmount: updateOrderDto.totalAmount,

      user,
    });
  }

  remove(id: Order['id']) {
    return this.orderRepository.remove(id);
  }
}
