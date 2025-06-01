import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ProductLine } from '../../domain/product-line';

export abstract class ProductLineRepository {
  abstract create(
    data: Omit<ProductLine, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ProductLine>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ProductLine[]>;

  abstract findById(id: ProductLine['id']): Promise<NullableType<ProductLine>>;

  abstract findByIds(ids: ProductLine['id'][]): Promise<ProductLine[]>;

  abstract update(
    id: ProductLine['id'],
    payload: DeepPartial<ProductLine>,
  ): Promise<ProductLine | null>;

  abstract remove(id: ProductLine['id']): Promise<void>;
}
