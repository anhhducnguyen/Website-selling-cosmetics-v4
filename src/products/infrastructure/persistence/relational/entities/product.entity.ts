import { ProductLineEntity } from '../../../../../product-lines/infrastructure/persistence/relational/entities/product-line.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ProductImageEntity } from '../../../../../product-images/infrastructure/persistence/relational/entities/product-image.entity';

@Entity({
  name: 'product',
})
export class ProductEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  name?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: true,
    type: Number,
  })
  quantityInstock?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  price?: number | null;

  @ManyToOne(() => ProductLineEntity, { eager: true, nullable: true })
  productLine?: ProductLineEntity | null;

  @OneToMany(() => ProductImageEntity, (image) => image.product, {
    nullable: true,
    eager: true,
  })
  productImages?: ProductImageEntity[];

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
