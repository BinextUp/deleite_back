import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PageProductDto } from '../dto/page-product.dto';
import { Product } from '../entities/product.entity';
import { Public } from '../../auth/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/utils/enums/rol.enum';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Post('create')
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Get('all')
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
  
  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Get('search/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<any> {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
  /*
  @Get('api-products')
  async getApiProducts(): Promise<any> {
    return this.productsService.getApiProducts();
  }

  @Get('api-dollars')
  async getApiDollars(): Promise<any> {
    return this.productsService.getApiDollars();
  }
  */
  @Public()
  @Patch('api-products-wis')
  async getApiProductByWIS(@Body() pageProductDto: PageProductDto): Promise<any> {
    return this.productsService.getApiProductByWIS(this.inicilizePage(pageProductDto));
  }
  //TODO:Este codigo a través de Object.keys(body) obtengo los indeces del json, para armar los parametros del api 
  /*
  @Public()
  @Get('api-products-inventory-wis')
  async getApiProductInventoryByWIS(@Body() body: Record<string, any>): Promise<any> {
    if(typeof body === 'undefined' || Object.keys(body).length === 0) {
      body = {
        Page: 1
      };
    }
    return this.productsService.getApiSearchProductInventoryByWIS(body,Object.keys(body));
  }*/
    @Public()
    @Patch('api-products-inventory-wis')
    async getApiProductInventoryByWIS(@Body() pageProductDto: PageProductDto): Promise<any> {
      return this.productsService.getApiSearchProductInventoryByWIS(this.inicilizePage(pageProductDto));
    }

    inicilizePage(pageProductDto: PageProductDto){
      if(pageProductDto.Page===0) {
        pageProductDto = {
          Page: 1
        };
      }
      return pageProductDto;
    }

}
