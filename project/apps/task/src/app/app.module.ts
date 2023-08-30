import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TaskCategoryModule } from './task-category/task-category.module';
import { TaskPostModule } from './task-post/task-post.module';

@Module({
  imports: [PrismaModule, TaskCategoryModule, TaskPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
