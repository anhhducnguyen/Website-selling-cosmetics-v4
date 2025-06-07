import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Cart } from '../../../../domain/cart';
import { CartRepository } from '../../cart.repository';
import { CartMapper } from '../mappers/cart.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CartRelationalRepository implements CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) { }

  async create(data: Cart): Promise<Cart> {
    if (!data.user?.id || !data.product?.id) {
      throw new Error('User ID and Product ID are required.');
    }

    // Ép kiểu cho đúng định nghĩa entity (nếu id là string thì không cần ép)
    const userId = data.user.id;
    const productId = data.product.id;

    const existing = await this.cartRepository.findOne({
      where: {
        user: { id: userId as number }, // hoặc ép kiểu về string nếu cần
        product: { id: productId as string },
      },
      relations: ['user', 'product'], // đảm bảo quan hệ được lấy đầy đủ (tuỳ theo cấu hình eager)
    });

    if (existing) {
      existing.quantity = (existing.quantity || 0) + (data.quantity || 1);
      const updated = await this.cartRepository.save(existing);
      return CartMapper.toDomain(updated);
    }

    // Nếu chưa có thì tạo mới
    const newEntity = this.cartRepository.create(CartMapper.toPersistence(data));
    const saved = await this.cartRepository.save(newEntity);
    return CartMapper.toDomain(saved);
  }

  // async create(data: Cart): Promise<Cart> {
  //   const persistenceModel = CartMapper.toPersistence(data);
  //   const newEntity = await this.cartRepository.save(
  //     this.cartRepository.create(persistenceModel),
  //   );
  //   return CartMapper.toDomain(newEntity);
  // }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Cart[]> {
    const entities = await this.cartRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CartMapper.toDomain(entity));
  }

  async findById(id: Cart['id']): Promise<NullableType<Cart>> {
    const entity = await this.cartRepository.findOne({
      where: { id },
    });

    return entity ? CartMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Cart['id'][]): Promise<Cart[]> {
    const entities = await this.cartRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => CartMapper.toDomain(entity));
  }

  async update(id: Cart['id'], payload: Partial<Cart>): Promise<Cart> {
    const entity = await this.cartRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.cartRepository.save(
      this.cartRepository.create(
        CartMapper.toPersistence({
          ...CartMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CartMapper.toDomain(updatedEntity);
  }

  async remove(id: Cart['id']): Promise<void> {
    await this.cartRepository.delete(id);
  }
}
