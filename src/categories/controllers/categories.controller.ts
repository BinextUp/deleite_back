import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Rol } from '../../utils/enums/rol.enum';
import { Category } from '../entities/category.entity';
import { Public } from '../../auth/decorators/public.decorator';
import { PageCatSubCatDto } from '../dto/page-cat-subcat.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';


@Public()
@Controller('categories')
//TODO: implementar autenticacion, esto parte del backend lo debria hacer el administrador

export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto):Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }
  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Get('all')
  async findAll():Promise<Category[]> {
    return this.categoriesService.findAll();
  }


  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Get('search/:id')
  async findOne(@Param('id', ParseIntPipe) id: number):Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto):Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }
  
  @ApiBearerAuth()
  @Auth(Rol.USER)
  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number):Promise<void> {
    return this.categoriesService.remove(id);
  }

  @Get('allCategoriesApi')
  async findAllCategoriesApi():Promise<any> {
    return this.categoriesService.findAllApi();
  }

  @Patch('searchCategoriesApi/:id')
  async findOneApi(@Param('id', ParseIntPipe) id: number, @Body() pageCatSubCatDto: PageCatSubCatDto):Promise<any> {
    return this.categoriesService.apiGetProductByCategory(id, pageCatSubCatDto);
  }

  @Get('allSubCategoriesApi')
  async findAllSubCategoriesApi():Promise<any> {
    return this.categoriesService.findAllSubCategoriesApi();
  }

  @Patch('searchSubCategoriesApi/:id')
  async findOneSubCategoriesApi(@Param('id', ParseIntPipe) id: number, @Body() pageCatSubCatDto: PageCatSubCatDto):Promise<any> {
    return this.categoriesService.apiGetProductBySubCategory(id, pageCatSubCatDto);
  }

}
