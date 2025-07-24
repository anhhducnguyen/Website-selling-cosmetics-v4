import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';
import { DiscountEntity } from '../../../../../discounts/infrastructure/persistence/relational/entities/discount.entity';

@Entity({
  name: 'product_line',
})
export class ProductLineEntity extends EntityRelationalHelper {
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

  @OneToMany(() => ProductEntity, (product) => product.productLine, {
    eager: true,
    nullable: true,
    cascade: true,
  })
  products?: ProductEntity[] | null;

  @ManyToMany(() => DiscountEntity, (discount) => discount.productLine, {
    eager: true,
    nullable: true,
  })
  discounts?: DiscountEntity[] | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
