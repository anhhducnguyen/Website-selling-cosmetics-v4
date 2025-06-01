import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Cart } from '../../domain/cart';

export abstract class CartRepository {
  abstract create(
    data: Omit<Cart, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Cart>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Cart[]>;

  abstract findById(id: Cart['id']): Promise<NullableType<Cart>>;

  abstract findByIds(ids: Cart['id'][]): Promise<Cart[]>;

  abstract update(
    id: Cart['id'],
    payload: DeepPartial<Cart>,
  ): Promise<Cart | null>;

  abstract remove(id: Cart['id']): Promise<void>;
}
