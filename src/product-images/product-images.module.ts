import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { ProductImagesController } from './product-images.controller';
import { RelationalProductImagePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalProductImagePersistenceModule,
  ],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
  exports: [ProductImagesService, RelationalProductImagePersistenceModule],
})
export class ProductImagesModule {}
