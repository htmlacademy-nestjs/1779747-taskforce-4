import { Expose, Transform } from 'class-transformer';

export class UploadedFileRdo {
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public originalName: string;

  @Expose()
  public hashName: string;

  @Expose()
  public mimetype: string;

  @Expose()
  public size: number;

  @Expose()
  public path: string;
}