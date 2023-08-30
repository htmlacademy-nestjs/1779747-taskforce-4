import { StatusTask } from "./statusTask.enum";
import { Comment } from "./comment.interface";
import { Category } from "./category.interface";
import { Tag } from "./tag.interface";

export interface Task {
    _id?: string;
    title: string;
    description: string;
    categories: Category[];
    price?: number;
    deadline?: Date;
    image?: string;
    address?: string;
    tags?: Tag[];
    city: string;
    userId: string;
    createdAt?: Date;
    publishAt?: Date;
    // statusTask: StatusTask;
    comments: Comment[];


}