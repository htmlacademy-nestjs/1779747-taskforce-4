import { Category, Tag, Comment} from '@project/shared/app-types';
import { Expose } from 'class-transformer';

export class TaskRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public categories: Category[];

  @Expose()
  public price?: number;

  @Expose()
  public deadline: Date;

  @Expose()
  public image?: string;

  @Expose()
  public address?: string;

  @Expose()
  public tags: Tag[];

  @Expose()
  public city: string;

  @Expose()
  public userId: string;

  @Expose()
  public publishAt: string;

//   @Expose()
//   public statusTask: StatusTask[];

  @Expose()
  public comments: Comment[];

  

  

 

  

  

  
}