import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetailRepository } from './infrastructure/persistence/order-detail.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderDetail } from './domain/order-detail';

@Injectable()
export class OrderDetailsService {
  constructor(
    // Dependencies here
    private readonly orderDetailRepository: OrderDetailRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createOrderDetailDto: CreateOrderDetailDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.orderDetailRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderDetailRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: OrderDetail['id']) {
    return this.orderDetailRepository.findById(id);
  }

  findByIds(ids: OrderDetail['id'][]) {
    return this.orderDetailRepository.findByIds(ids);
  }

  async update(
    id: OrderDetail['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.orderDetailRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: OrderDetail['id']) {
    return this.orderDetailRepository.remove(id);
  }
}
