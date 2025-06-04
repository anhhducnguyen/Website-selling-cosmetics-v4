import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // UseGuards,
  Query,
} from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductImage } from './domain/product-image';
// import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllProductImagesDto } from './dto/find-all-product-images.dto';

@ApiTags('Productimages')
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'product-images',
  version: '1',
})
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post()
  @ApiCreatedResponse({
    type: ProductImage,
  })
  create(@Body() createProductImageDto: CreateProductImageDto) {
    return this.productImagesService.create(createProductImageDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ProductImage),
  })
  async findAll(
    @Query() query: FindAllProductImagesDto,
  ): Promise<InfinityPaginationResponseDto<ProductImage>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.productImagesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }
  // @Get()
  // async findAll(
  //   @Query() query: FindAllProductImagesDto,
  // ): Promise<InfinityPaginationResponseDto<any>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   const productImages = await this.productImagesService.findAllWithPagination({
  //     paginationOptions: { page, limit },
  //   });

  //   // Nhóm ảnh theo product.id
  //   const productMap = new Map<string, any>();

  //   for (const image of productImages) {
  //     const { id, path, createdAt, updatedAt, product } = image;

  //     if (!product) continue;

  //     const productKey = product.id;
  //     const { productLine, ...productRest } = product;

  //     if (!productMap.has(productKey)) {
  //       productMap.set(productKey, {
  //         ...productRest,
  //         line: productLine,
  //         images: [],
  //       });
  //     }

  //     const productData = productMap.get(productKey);
  //     productData.images.push({
  //       id,
  //       url: path, // đổi 'path' thành 'url' nếu bạn muốn theo chuẩn cũ
  //       createdAt,
  //       updatedAt,
  //     });
  //   }

  //   const products = Array.from(productMap.values());

  //   return infinityPagination(products, { page, limit });
  // }
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ProductImage,
  })
  findById(@Param('id') id: string) {
    return this.productImagesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ProductImage,
  })
  update(
    @Param('id') id: string,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    return this.productImagesService.update(id, updateProductImageDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.productImagesService.remove(id);
  }
}
