export interface Comment {
    id?: number;
    text: string;
    taskId: number;
    userId: string;
    createAt: Date
    updatedAt: Date;
  }