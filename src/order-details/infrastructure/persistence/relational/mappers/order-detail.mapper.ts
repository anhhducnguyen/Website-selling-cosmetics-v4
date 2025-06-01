import { OrderDetail } from '../../../../domain/order-detail';
import { OrderDetailEntity } from '../entities/order-detail.entity';

export class OrderDetailMapper {
  static toDomain(raw: OrderDetailEntity): OrderDetail {
    const domainEntity = new OrderDetail();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: OrderDetail): OrderDetailEntity {
    const persistenceEntity = new OrderDetailEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
