import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Rol } from '../../utils/enums/rol.enum';
import { Category } from '../entities/category.entity';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('categories')
@Auth(Rol.ADMIN)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto):Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll():Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number):Promise<Category | null> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto):Promise<Category | null> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number):Promise<void> {
    return this.categoriesService.remove(id);
  }
}
