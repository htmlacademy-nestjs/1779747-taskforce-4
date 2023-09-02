import { TaskCategoryService } from './task-category.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { CategoryRdo } from './rdo/category.rdo';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class TaskCategoryController {
  constructor(
    private readonly taskCategoryService: TaskCategoryService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: string) {
    const categoryId = parseInt(id, 10);
    const existCategory = await this.taskCategoryService.getCategory(categoryId);
    return fillObject(CategoryRdo, existCategory);
  }

  @Get('/')
  async index() {
    const categories = await this.taskCategoryService.getCategories();
    return fillObject(CategoryRdo, categories);
  }

  @Post('/')
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.taskCategoryService.createCategory(dto);
    return fillObject(CategoryRdo, newCategory);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const categoryId = await parseInt(id, 10);
    this.taskCategoryService.deleteCategory(categoryId);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const categoryId = parseInt(id, 10);
    const updatedCategory = await this.taskCategoryService.updateCategory(categoryId, dto)
    return fillObject(CategoryRdo, updatedCategory);
  }
}