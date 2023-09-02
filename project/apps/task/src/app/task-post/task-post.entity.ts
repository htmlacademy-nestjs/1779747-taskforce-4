import { Entity } from '@project/util/util-types';
import { Category, Task, Comment, Tag} from '@project/shared/app-types';

export class TaskPostEntity implements Entity<TaskPostEntity>, Task {
  public id: number;
  public title: string;
  public description: string;
  public categories: Category[];
  public price?: number;
  public deadline: Date;
  public image?: string;  
  public address?: string;
  public tags?: Tag[];
  public city: string;
  public userId: string;
  public createdAt: Date;
  public publishAt: Date;
//   public statusTask: StatusTask;
  public comments: Comment[];
  
 
  constructor(post: Task) {
    this.fillEntity(post);
  }

  public fillEntity(entity: Task): void {
    this.title = entity.title;
    this.description = entity.description;
    this.price = entity.price;
    this.address = entity.address;
    this.city = entity.city;
    this.publishAt = new Date();
    this.userId = entity.userId;
    this.comments = [];
    this.categories = [...entity.categories];
    this.tags = [];
    this.deadline = entity.deadline;
    this.image = entity.image;
    this.createdAt = new Date();
  }

  public toObject(): TaskPostEntity {
    return {
      ...this,
      categories: [...this.categories],
      comments: [...this.comments],
      tags: [...this.tags],
    };
  }

}