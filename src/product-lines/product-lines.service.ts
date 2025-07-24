import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateProductLineDto } from './dto/create-product-line.dto';
import { UpdateProductLineDto } from './dto/update-product-line.dto';
import { ProductLineRepository } from './infrastructure/persistence/product-line.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ProductLine } from './domain/product-line';

@Injectable()
export class ProductLinesService {
  constructor(
    // Dependencies here
    private readonly productLineRepository: ProductLineRepository,
  ) {}

  async create(createProductLineDto: CreateProductLineDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.productLineRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      name: createProductLineDto.name,

      description: createProductLineDto.description,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.productLineRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ProductLine['id']) {
    return this.productLineRepository.findById(id);
  }

  findByIds(ids: ProductLine['id'][]) {
    return this.productLineRepository.findByIds(ids);
  }

  async update(
    id: ProductLine['id'],

    updateProductLineDto: UpdateProductLineDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.productLineRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      name: updateProductLineDto.name,

      description: updateProductLineDto.description,
    });
  }

  remove(id: ProductLine['id']) {
    return this.productLineRepository.remove(id);
  }
}

// import {
//   Injectable,
//   Inject,
// } from '@nestjs/common';
// import { CreateProductLineDto } from './dto/create-product-line.dto';
// import { UpdateProductLineDto } from './dto/update-product-line.dto';
// import { ProductLineRepository } from './infrastructure/persistence/product-line.repository';
// import { IPaginationOptions } from '../utils/types/pagination-options';
// import { ProductLine } from './domain/product-line';

// import { Cache } from 'cache-manager';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';

// @Injectable()
// export class ProductLinesService {
//   constructor(
//     private readonly productLineRepository: ProductLineRepository,

//     @Inject(CACHE_MANAGER)
//     private readonly cacheManager: Cache,
//   ) { }

//   async create(createProductLineDto: CreateProductLineDto) {
//     return this.productLineRepository.create({
//       name: createProductLineDto.name,
//       description: createProductLineDto.description,
//     });
//   }

//   async findAllWithPagination({
//     paginationOptions,
//   }: {
//     paginationOptions: IPaginationOptions;
//   }): Promise<ProductLine[]> {
//     const cacheKey = `product-lines:page:${paginationOptions.page}:limit:${paginationOptions.limit}`;
//     const cached = await this.cacheManager.get(cacheKey);
//     console.log('Cached value:', cached);

//     if (cached) {
//       console.log('[REDIS] Cache HIT');
//       return cached as ProductLine[];
//     }
//     console.log('[REDIS] Cache MISS');
//     const result = await this.productLineRepository.findAllWithPagination({
//       paginationOptions,
//     });

//     await this.cacheManager.set(cacheKey, result, 60); // Cache 60 giây

//     return result;
//   }

//   findById(id: ProductLine['id']) {
//     return this.productLineRepository.findById(id);
//   }

//   findByIds(ids: ProductLine['id'][]) {
//     return this.productLineRepository.findByIds(ids);
//   }

//   async update(
//     id: ProductLine['id'],
//     updateProductLineDto: UpdateProductLineDto,
//   ) {
//     return this.productLineRepository.update(id, {
//       name: updateProductLineDto.name,
//       description: updateProductLineDto.description,
//     });
//   }

//   remove(id: ProductLine['id']) {
//     return this.productLineRepository.remove(id);
//   }
// }

// import {
//   Injectable,
//   Inject,
// } from '@nestjs/common';
// import { CreateProductLineDto } from './dto/create-product-line.dto';
// import { UpdateProductLineDto } from './dto/update-product-line.dto';
// import { ProductLineRepository } from './infrastructure/persistence/product-line.repository';
// import { IPaginationOptions } from '../utils/types/pagination-options';
// import { ProductLine } from './domain/product-line';

// import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

// @Injectable()
// export class ProductLinesService {
//   constructor(
//     private readonly productLineRepository: ProductLineRepository,

//     @Inject(CACHE_MANAGER) private cacheManager: Cache
//   ) {}

//   async create(createProductLineDto: CreateProductLineDto) {
//     // Do not remove comment below.
//     // <creating-property />
//     return this.productLineRepository.create({
//       // Do not remove comment below.
//       // <creating-property-payload />
//       name: createProductLineDto.name,
//       description: createProductLineDto.description,
//     });
//   }

// async findAllWithPagination({
//   paginationOptions,
// }: {
//   paginationOptions: IPaginationOptions;
// }): Promise<ProductLine[]> {
//   const cacheKey = `product-lines:page:${paginationOptions.page}:limit:${paginationOptions.limit}`;
//   console.log('Checking cache with key:', cacheKey);

//   const cached = await this.cacheManager.get<ProductLine[]>(cacheKey);

//   await this.cacheManager.set('test-key', 'ducanh', 60);
//   const value = await this.cacheManager.get('test-key');
//   console.log('Test Redis value:', value);

//   if (cached) {
//     console.log('[REDIS] Cache HIT. Returning cached data.');
//     // Thêm dòng log này để xem dữ liệu trả về từ cache là gì
//     console.log('Data from cache:', JSON.stringify(cached, null, 2));
//     return cached;
//   }

//   console.log('[REDIS] Cache MISS. Fetching from repository.');
//   const resultFromRepo = await this.productLineRepository.findAllWithPagination({
//     paginationOptions,
//   });
//   console.log('Result from repository:', resultFromRepo.length, 'items');

//   // BIẾN ĐỔI QUAN TRỌNG: Chuyển đổi kết quả thành plain object
//   // JSON.parse(JSON.stringify(object)) là một mẹo nhanh để loại bỏ mọi thứ không phải là plain data
//   const plainResult = JSON.parse(JSON.stringify(resultFromRepo));

//   // Thêm log để chắc chắn plainResult có dữ liệu
//   console.log('Plain result to be cached:', JSON.stringify(plainResult, null, 2));

//   await this.cacheManager.set(cacheKey, plainResult, 60);
//   console.log(`[REDIS] Data set to cache with key: ${cacheKey} (TTL: 60s)`);

//   return resultFromRepo; // Vẫn trả về kết quả gốc từ repo cho lần gọi đầu tiên
// }

//   findById(id: ProductLine['id']) {
//     return this.productLineRepository.findById(id);
//   }

//   findByIds(ids: ProductLine['id'][]) {
//     return this.productLineRepository.findByIds(ids);
//   }

//   async update(
//     id: ProductLine['id'],
//     updateProductLineDto: UpdateProductLineDto,
//   ) {
//     // Do not remove comment below.
//     // <updating-property />
//     return this.productLineRepository.update(id, {
//       // Do not remove comment below.
//       // <updating-property-payload />
//       name: updateProductLineDto.name,
//       description: updateProductLineDto.description,
//     });
//   }

//   remove(id: ProductLine['id']) {
//     return this.productLineRepository.remove(id);
//   }
// }
