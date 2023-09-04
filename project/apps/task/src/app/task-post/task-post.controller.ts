import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskPostService } from './task-post.service';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostQuery } from './query/post.query';

@Controller('tasks')
export class TaskPostController {
  constructor(
    private readonly taskPostService: TaskPostService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    const post = await this.taskPostService.getTask(id);
    return fillObject(TaskRdo, post);
  }

  @Get('/')
  async index(@Query() query: PostQuery) {
    const posts = await this.taskPostService.getTasks(query);
    return fillObject(TaskRdo, posts);
  }

  @Post('/')
  async create(@Body() dto: CreatePostDto) {
    const newPost = await this.taskPostService.createTask(dto);
    return fillObject(TaskRdo, newPost);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskPostService.deleteTask(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    const updatedTask = await this.taskPostService.updateTask(id, dto);
    return fillObject(TaskRdo, updatedTask)
  }
}