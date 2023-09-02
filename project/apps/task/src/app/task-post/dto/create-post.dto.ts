export class CreatePostDto {
    public title: string;
    public description: string;
    public categories: number[];
    public price?: number;
    public dedline?: Date;
    public image?: string;
    public address?: string;
    public tags?: string[];
    public city: string;
    public userId: string;
    // public statusTask: string;
  }