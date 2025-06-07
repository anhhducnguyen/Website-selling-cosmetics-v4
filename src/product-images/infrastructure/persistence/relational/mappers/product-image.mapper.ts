import { ProductImage } from '../../../../domain/product-image';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { ProductImageEntity } from '../entities/product-image.entity';

export class ProductImageMapper {
  static toDomain(raw: ProductImageEntity): ProductImage {
    const domainEntity = new ProductImage();
    domainEntity.path = raw.path;

    if (raw.product) {
      domainEntity.product = ProductMapper.toDomain(raw.product);
    } else if (raw.product === null) {
      domainEntity.product = null;
    }

    domainEntity.id = raw.id;
    // domainEntity.createdAt = raw.createdAt;
    // domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ProductImage): ProductImageEntity {
    const persistenceEntity = new ProductImageEntity();
    persistenceEntity.path = domainEntity.path;

    if (domainEntity.product) {
      persistenceEntity.product = ProductMapper.toPersistence(
        domainEntity.product,
      );
    } else if (domainEntity.product === null) {
      persistenceEntity.product = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
