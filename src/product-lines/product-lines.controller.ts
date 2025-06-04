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
import { ProductLinesService } from './product-lines.service';
import { CreateProductLineDto } from './dto/create-product-line.dto';
import { UpdateProductLineDto } from './dto/update-product-line.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductLine } from './domain/product-line';
// import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllProductLinesDto } from './dto/find-all-product-lines.dto';

@ApiTags('Productlines')
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'product-lines',
  version: '1',
})
export class ProductLinesController {
  constructor(private readonly productLinesService: ProductLinesService) {}

  @Post()
  @ApiCreatedResponse({
    type: ProductLine,
  })
  create(@Body() createProductLineDto: CreateProductLineDto) {
    return this.productLinesService.create(createProductLineDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ProductLine),
  })
  async findAll(
    @Query() query: FindAllProductLinesDto,
  ): Promise<InfinityPaginationResponseDto<ProductLine>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.productLinesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ProductLine,
  })
  findById(@Param('id') id: string) {
    return this.productLinesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ProductLine,
  })
  update(
    @Param('id') id: string,
    @Body() updateProductLineDto: UpdateProductLineDto,
  ) {
    return this.productLinesService.update(id, updateProductLineDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.productLinesService.remove(id);
  }
}
