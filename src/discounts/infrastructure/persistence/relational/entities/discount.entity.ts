import { ProductLineEntity } from '../../../../../product-lines/infrastructure/persistence/relational/entities/product-line.entity';

import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'discount',
})
export class DiscountEntity extends EntityRelationalHelper {
  // @ManyToMany(() => ProductLineEntity, {
  //   eager: true,
  //   nullable: true })
  // @JoinTable()
  // productLine?: ProductLineEntity[] | null;

  @ManyToMany(() => ProductLineEntity, (productLine) => productLine.discounts, {
    nullable: true,
  })
  @JoinTable()
  productLine?: ProductLineEntity[] | null;

  @ManyToMany(() => ProductEntity, { eager: true, nullable: true })
  @JoinTable()
  product?: ProductEntity[] | null;

  @Column({
    nullable: true,
    type: Date,
  })
  endDate?: Date | null;

  @Column({
    nullable: true,
    type: Date,
  })
  startDate?: Date | null;

  @Column({
    nullable: true,
    type: String,
  })
  type?: string | null;

  @Column({
    nullable: true,
    type: Number,
  })
  value?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  name?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
