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
  name: 'product_image',
})
export class ProductImageEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  path?: string | null;

  @ManyToOne(() => ProductEntity, {
    nullable: true,
  })
  product?: ProductEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
