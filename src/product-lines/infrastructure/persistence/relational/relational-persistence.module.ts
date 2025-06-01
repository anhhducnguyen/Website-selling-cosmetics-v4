import { Module } from '@nestjs/common';
import { ProductLineRepository } from '../product-line.repository';
import { ProductLineRelationalRepository } from './repositories/product-line.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLineEntity } from './entities/product-line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductLineEntity])],
  providers: [
    {
      provide: ProductLineRepository,
      useClass: ProductLineRelationalRepository,
    },
  ],
  exports: [ProductLineRepository],
})
export class RelationalProductLinePersistenceModule {}
