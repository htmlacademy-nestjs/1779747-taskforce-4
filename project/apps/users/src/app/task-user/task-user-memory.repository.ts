import { CRUDRepository } from '@project/util/util-types';
import { TaskUserEntity } from './task-user.entity';
import { User } from '@project/shared/app-types';
import { randomUUID } from 'node:crypto';

export class BlogUserMemoryRepository implements CRUDRepository<TaskUserEntity, string, User> {
  private repository: Record<string, User> = {};

  public async create(item: TaskUserEntity): Promise<User> {
    const entry = { ...item.toObject(), _id: randomUUID()};
    this.repository[entry._id] = entry;

    return entry;
  }

  public async findById(id: string): Promise<User> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const existUser = Object.values(this.repository)
      .find((userItem) => userItem.email === email);

    if (! existUser) {
      return null;
    }

    return { ...existUser};
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: TaskUserEntity): Promise<User> {
    this.repository[id] = { ...item.toObject(), _id: id};
    return this.findById(id);
  }
}