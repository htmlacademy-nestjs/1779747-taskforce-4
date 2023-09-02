import { TaskCategoryController } from './task-category.controller';
import { TaskCategoryService } from './task-category.service';
import { TaskCategoryRepository } from './task-category.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TaskCategoryController],
  providers: [TaskCategoryService, TaskCategoryRepository],
  exports: [TaskCategoryRepository]
})
export class TaskCategoryModule {}