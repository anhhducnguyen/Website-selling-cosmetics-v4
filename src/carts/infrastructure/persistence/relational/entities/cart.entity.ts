import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'cart',
})
export class CartEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  quantity?: number | null;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  user?: UserEntity | null;

  @ManyToOne(() => ProductEntity, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  product?: ProductEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
