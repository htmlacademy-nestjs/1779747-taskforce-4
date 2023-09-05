import { Injectable } from '@nestjs/common';
import { TaskPostRepository } from './task-post.repository';
import { TaskCategoryRepository } from '../task-category/task-category.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { Task} from '@project/shared/app-types';
import { TaskPostEntity } from './task-post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostQuery } from './query/post.query';


@Injectable()
export class TaskPostService {
  constructor(
    private readonly taskPostRepository: TaskPostRepository,
    private readonly taskCategoryRepository: TaskCategoryRepository
  ) {}

  async createTask(dto: CreatePostDto): Promise<Task> {
    const categories = await this.taskCategoryRepository.find(dto.categories);
    const postEntity = new TaskPostEntity({ ...dto, categories, comments: [], tags: []});
    return this.taskPostRepository.create(postEntity);
  }

  async deleteTask(id: number): Promise<void> {
    this.taskPostRepository.destroy(id);
  }

  async getTask(id: number): Promise<Task> {
    return this.taskPostRepository.findById(id);
  }

  async getTasks(query: PostQuery): Promise<Task[]> {
    return this.taskPostRepository.find(query);
  }

  async updateTask(_id: number, _dto: UpdatePostDto): Promise<Task> {
    throw new Error('Not implemented…');
  }

}