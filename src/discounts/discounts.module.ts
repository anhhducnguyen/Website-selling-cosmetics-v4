import { ProductLinesModule } from '../product-lines/product-lines.module';
import { ProductsModule } from '../products/products.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';
import { RelationalDiscountPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    ProductLinesModule,

    ProductsModule,

    // do not remove this comment
    RelationalDiscountPersistenceModule,
  ],
  controllers: [DiscountsController],
  providers: [DiscountsService],
  exports: [DiscountsService, RelationalDiscountPersistenceModule],
})
export class DiscountsModule {}
