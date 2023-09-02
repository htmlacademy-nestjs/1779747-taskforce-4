import { Expose } from 'class-transformer';

export class CategoryRdo {
  @Expose()
  public categoryId: string;

  @Expose()
  public title: string;
}