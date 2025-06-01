import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { RelationalCartPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    UsersModule,

    ProductsModule,

    // do not remove this comment
    RelationalCartPersistenceModule,
  ],
  controllers: [CartsController],
  providers: [CartsService],
  exports: [CartsService, RelationalCartPersistenceModule],
})
export class CartsModule {}
