import { ProductsModule } from '../products/products.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { RelationalReviewPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    ProductsModule,

    // do not remove this comment
    RelationalReviewPersistenceModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService, RelationalReviewPersistenceModule],
})
export class ReviewsModule {}
