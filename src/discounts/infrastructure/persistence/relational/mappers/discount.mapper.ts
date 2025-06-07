import { Discount } from '../../../../domain/discount';
import { ProductLineMapper } from '../../../../../product-lines/infrastructure/persistence/relational/mappers/product-line.mapper';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { DiscountEntity } from '../entities/discount.entity';

export class DiscountMapper {
  static toDomain(raw: DiscountEntity): Discount {
    const domainEntity = new Discount();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.type = raw.type;
    domainEntity.value = raw.value;
    domainEntity.startDate = raw.startDate;
    domainEntity.endDate = raw.endDate;

    if (raw.productLine) {
      domainEntity.productLine = raw.productLine.map((item) =>
        ProductLineMapper.toDomain(item),
      );
    } else if (raw.productLine === null) {
      domainEntity.productLine = null;
    }

    if (raw.product) {
      domainEntity.product = raw.product.map((item) =>
        ProductMapper.toDomain(item),
      );
    } else if (raw.product === null) {
      domainEntity.product = null;
    }

    // domainEntity.createdAt = raw.createdAt;
    // domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Discount): DiscountEntity {
    const persistenceEntity = new DiscountEntity();
    if (domainEntity.productLine) {
      persistenceEntity.productLine = domainEntity.productLine.map((item) =>
        ProductLineMapper.toPersistence(item),
      );
    } else if (domainEntity.productLine === null) {
      persistenceEntity.productLine = null;
    }

    if (domainEntity.product) {
      persistenceEntity.product = domainEntity.product.map((item) =>
        ProductMapper.toPersistence(item),
      );
    } else if (domainEntity.product === null) {
      persistenceEntity.product = null;
    }

    persistenceEntity.endDate = domainEntity.endDate;

    persistenceEntity.startDate = domainEntity.startDate;

    persistenceEntity.type = domainEntity.type;

    persistenceEntity.value = domainEntity.value;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
