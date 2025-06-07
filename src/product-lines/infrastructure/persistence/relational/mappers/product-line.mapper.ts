import { ProductLine } from '../../../../domain/product-line';

import { ProductLineEntity } from '../entities/product-line.entity';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { DiscountMapper } from '../../../../../discounts/infrastructure/persistence/relational/mappers/discount.mapper';

export class ProductLineMapper {
  static toDomain(raw: ProductLineEntity): ProductLine {
    const domainEntity = new ProductLine();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    // domainEntity.createdAt = raw.createdAt;
    // domainEntity.updatedAt = raw.updatedAt;

    if (raw.products) {
      domainEntity.products = raw.products.map((product) =>
        ProductMapper.toDomain(product),
      );
    }

    if (raw.discounts) {
      domainEntity.discounts = raw.discounts.map((d) =>
        DiscountMapper.toDomain(d),
      );
    } else if (raw.discounts === null) {
      domainEntity.discounts = null;
    }

    // if (raw.products) {
    //   domainEntity.products = raw.products.map((product) => ({
    //     id: product.id,
    //     name: product.name ?? null,
    //   }));
    // }

    return domainEntity;
  }

  static toPersistence(domainEntity: ProductLine): ProductLineEntity {
    const persistenceEntity = new ProductLineEntity();
    persistenceEntity.name = domainEntity.name;

    persistenceEntity.description = domainEntity.description;

    if (domainEntity.discounts) {
      persistenceEntity.discounts = domainEntity.discounts.map((d) =>
        DiscountMapper.toPersistence(d),
      );
    } else if (domainEntity.discounts === null) {
      persistenceEntity.discounts = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
