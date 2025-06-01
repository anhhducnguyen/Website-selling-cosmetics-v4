import { ProductImage } from '../../../../domain/product-image';
import { ProductImageEntity } from '../entities/product-image.entity';

export class ProductImageMapper {
  static toDomain(raw: ProductImageEntity): ProductImage {
    const domainEntity = new ProductImage();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ProductImage): ProductImageEntity {
    const persistenceEntity = new ProductImageEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
