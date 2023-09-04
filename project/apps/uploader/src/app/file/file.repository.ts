import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileModel } from './file.model';
import { Model } from 'mongoose';
import { FileEntity } from './file.entity';
import { File } from '@project/shared/app-types';

@Injectable()
export class FileRepository {
  constructor(
    @InjectModel(FileModel.name) private readonly fileModel: Model<FileModel>
  ) {}

  public async create(item: FileEntity): Promise<File> {
    const file = new this.fileModel(item);
    return file.save();
  }

  public async findById(id: string): Promise<File | null> {
    return this.fileModel
      .findOne({ _id: id})
      .exec();
  }
}