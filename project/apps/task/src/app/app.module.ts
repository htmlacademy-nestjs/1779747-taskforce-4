import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TaskCategoryModule } from './task-category/task-category.module';

@Module({
  imports: [PrismaModule, TaskCategoryModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
