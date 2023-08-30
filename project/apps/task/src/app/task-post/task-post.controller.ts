import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { TaskPostService } from './task-post.service';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('tasks')
export class TaskPostController {
  constructor(
    private readonly taskPostService: TaskPostService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    const post = await this.taskPostService.getTask(postId);
    return fillObject(TaskRdo, post);
  }

  @Get('/')
  async index() {
    const posts = await this.taskPostService.getTasks();
    return fillObject(TaskRdo, posts);
  }

  @Post('/')
  async create(@Body() dto: CreatePostDto) {
    const newPost = await this.taskPostService.createTask(dto);
    return fillObject(TaskRdo, newPost);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    this.taskPostService.deleteTask(postId);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const postId = parseInt(id, 10);
    const updatedTask = await this.taskPostService.updateTask(postId, dto);
    return fillObject(TaskRdo, updatedTask)
  }
}