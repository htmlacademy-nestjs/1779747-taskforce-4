import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { TaskPostEntity } from './task-post.entity';
import { Task } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';
import { PostQuery } from './query/post.query';


@Injectable()
export class TaskPostRepository implements CRUDRepository<TaskPostEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskPostEntity): Promise<Task> {
    const entityData = item.toObject();
    return this.prisma.task.create({
      data: {
        ...entityData,
        comments: {
          connect: []
        },
        categories: {
          connect: entityData.categories
            .map(({ categoryId }) => ({ categoryId }))
        },
        tags: {
          connect: entityData.tags.map(({ tagId }) => ({ tagId }))
        }
      },
      include: {
        comments: true,
        categories: true,
        tags: true,
      }
    });
  }

  public async destroy(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        taskId,
      }
    });
  }

  public async findById(taskId: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {
        taskId
      },
      include: {
        comments: true,
        categories: true,
        tags: true,
      }
    });
  }

  public find({limit, categories, sortDirection, page}: PostQuery): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        categories: {
          some: {
            categoryId: {
              in: categories
            }
          }
        }
      },
      take: limit,
      include: {
        comments: true,
        categories: true,
        tags: true,
      },
      orderBy: [
        { createdAt: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(_id: number, _item: TaskPostEntity): Promise<Task> {
    return Promise.resolve(undefined);
  }
}