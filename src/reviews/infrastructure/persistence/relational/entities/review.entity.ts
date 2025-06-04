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
  name: 'review',
})
export class ReviewEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  rating?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  reviewText?: string | null;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  user?: UserEntity | null;

  @ManyToOne(() => ProductEntity, { eager: true, nullable: true })
  product?: ProductEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
