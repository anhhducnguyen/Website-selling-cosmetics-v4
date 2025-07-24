import { Product } from '../../../../domain/product';

import { ProductLineMapper } from '../../../../../product-lines/infrastructure/persistence/relational/mappers/product-line.mapper';

import { ProductEntity } from '../entities/product.entity';

import { ProductImageMapper } from '../../../../../product-images/infrastructure/persistence/relational/mappers/product-image.mapper';

export class ProductMapper {
  static toDomain(raw: ProductEntity): Product {
    const domainEntity = new Product();
    domainEntity.id = raw.id;

    domainEntity.name = raw.name;

    domainEntity.description = raw.description;

    domainEntity.quantityInstock = raw.quantityInstock;

    domainEntity.price = raw.price;

    // if (raw.productLine) {
    //   domainEntity.productLine = ProductLineMapper.toDomain(raw.productLine);
    // } else if (raw.productLine === null) {
    //   domainEntity.productLine = null;
    // }

    if (raw.productImages) {
      domainEntity.images = raw.productImages.map((image) =>
        ProductImageMapper.toDomain(image),
      );
    }

    // domainEntity.createdAt = raw.createdAt;
    // domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Product): ProductEntity {
    const persistenceEntity = new ProductEntity();
    persistenceEntity.name = domainEntity.name;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.quantityInstock = domainEntity.quantityInstock;

    persistenceEntity.price = domainEntity.price;

    if (domainEntity.productLine) {
      persistenceEntity.productLine = ProductLineMapper.toPersistence(
        domainEntity.productLine,
      );
    } else if (domainEntity.productLine === null) {
      persistenceEntity.productLine = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
