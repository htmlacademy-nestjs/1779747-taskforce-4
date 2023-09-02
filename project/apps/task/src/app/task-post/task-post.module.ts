import { Module } from "@nestjs/common";
import { TaskCategoryModule } from "../task-category/task-category.module";
import { TaskPostController } from "./task-post.controller";
import { TaskPostRepository } from "./task-post.repository";
import { TaskPostService } from "./task-post.service";


@Module({
  imports: [TaskCategoryModule],
  controllers: [TaskPostController],
  providers: [TaskPostService, TaskPostRepository],
})
export class TaskPostModule {}