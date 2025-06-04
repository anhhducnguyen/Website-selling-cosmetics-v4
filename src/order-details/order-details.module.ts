import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { RelationalOrderDetailPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    OrdersModule,

    ProductsModule,

    // do not remove this comment
    RelationalOrderDetailPersistenceModule,
  ],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService, RelationalOrderDetailPersistenceModule],
})
export class OrderDetailsModule {}
