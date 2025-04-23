import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
//import { Rol } from '../../utils/enums/rol.enum';
import { Category } from '../entities/category.entity';
import { Public } from '../../auth/decorators/public.decorator';
import { PageCategoryDto } from '../dto/page-category.dto';
//import { Auth } from '../../auth/decorators/auth.decorator';
//import { ApiBearerAuth } from '@nestjs/swagger';

//@ApiBearerAuth()
@Public()
@Controller('categories')
//TODO: implementar autenticacion, esto parte del backend lo debria hacer el administrador
//@Auth(Rol.USER)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto):Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get('all')
  async findAll():Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get('search/:id')
  async findOne(@Param('id', ParseIntPipe) id: number):Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto):Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number):Promise<void> {
    return this.categoriesService.remove(id);
  }

  @Get('allApi')
  async findAllApi():Promise<any> {
    return this.categoriesService.findAllApi();
  }

  @Patch('searchApi/:id')
  async findOneApi(@Param('id', ParseIntPipe) id: number, @Body() pageCategoryDto: PageCategoryDto):Promise<any> {
    return this.categoriesService.apiGetProductByCategory(id, pageCategoryDto);
  }

}
