export class UpdatePostDto {
    public title: string;
    public description: string;
    public price?: number;
    public deadline: Date;
    public image?: string;
    public address?: string;
    public city: string;
    // public statusTask: string[];
  }