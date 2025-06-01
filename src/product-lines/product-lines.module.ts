import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ProductLinesService } from './product-lines.service';
import { ProductLinesController } from './product-lines.controller';
import { RelationalProductLinePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalProductLinePersistenceModule,
  ],
  controllers: [ProductLinesController],
  providers: [ProductLinesService],
  exports: [ProductLinesService, RelationalProductLinePersistenceModule],
})
export class ProductLinesModule {}
