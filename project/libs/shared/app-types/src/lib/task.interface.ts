import { City } from "./city.enum";
import { StatusTask } from "./statusTask.enum";
import { Comment } from "./comment.interface";

export interface Task {
    _id?: string;
    title: string;
    description: string;
    categories: string;
    price?: number;
    deadline?: Date;
    image?: string;
    address?: string;
    tags?: string;
    city: City;
    userId: string;
    created: Date;
    publish: Date;
    statusTask: StatusTask;
    commet: Comment[];


}