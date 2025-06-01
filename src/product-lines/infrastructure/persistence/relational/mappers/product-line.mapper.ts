import { ProductLine } from '../../../../domain/product-line';
import { ProductLineEntity } from '../entities/product-line.entity';

export class ProductLineMapper {
  static toDomain(raw: ProductLineEntity): ProductLine {
    const domainEntity = new ProductLine();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ProductLine): ProductLineEntity {
    const persistenceEntity = new ProductLineEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
