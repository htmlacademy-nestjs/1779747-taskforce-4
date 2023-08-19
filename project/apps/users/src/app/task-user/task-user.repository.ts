import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { TaskUserEntity } from './task-user.entity';
import { User } from '@project/shared/app-types';
import { TaskUserModel } from './task-user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskUserRepository implements CRUDRepository<TaskUserEntity, string, User> {
  constructor(
    @InjectModel(TaskUserModel.name) private readonly taskUserModel: Model<TaskUserModel>) {
  }

  public async create(item: TaskUserEntity): Promise<User> {
    const newBlogUser = new this.taskUserModel(item);
    return newBlogUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.taskUserModel.deleteOne({id});
  }

  public async findById(id: string): Promise<User | null> {
    return this.taskUserModel
      .findOne({ _id: id })
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.taskUserModel
      .findOne({ email })
      .exec();
  }

  public async update(id: string, item: TaskUserEntity): Promise<User> {
    return this.taskUserModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }
}