import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ProductLineEntity } from '../entities/product-line.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ProductLine } from '../../../../domain/product-line';
import { ProductLineRepository } from '../../product-line.repository';
import { ProductLineMapper } from '../mappers/product-line.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ProductLineRelationalRepository implements ProductLineRepository {
  constructor(
    @InjectRepository(ProductLineEntity)
    private readonly productLineRepository: Repository<ProductLineEntity>,
  ) {}

  async create(data: ProductLine): Promise<ProductLine> {
    const persistenceModel = ProductLineMapper.toPersistence(data);
    const newEntity = await this.productLineRepository.save(
      this.productLineRepository.create(persistenceModel),
    );
    return ProductLineMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ProductLine[]> {
    const entities = await this.productLineRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ProductLineMapper.toDomain(entity));
  }

  async findById(id: ProductLine['id']): Promise<NullableType<ProductLine>> {
    const entity = await this.productLineRepository.findOne({
      where: { id },
    });

    return entity ? ProductLineMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ProductLine['id'][]): Promise<ProductLine[]> {
    const entities = await this.productLineRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ProductLineMapper.toDomain(entity));
  }

  async update(
    id: ProductLine['id'],
    payload: Partial<ProductLine>,
  ): Promise<ProductLine> {
    const entity = await this.productLineRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.productLineRepository.save(
      this.productLineRepository.create(
        ProductLineMapper.toPersistence({
          ...ProductLineMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ProductLineMapper.toDomain(updatedEntity);
  }

  async remove(id: ProductLine['id']): Promise<void> {
    await this.productLineRepository.delete(id);
  }
}
