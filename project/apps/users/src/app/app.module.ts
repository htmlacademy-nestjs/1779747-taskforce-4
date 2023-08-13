import { Module } from '@nestjs/common';
import { TaskUserModule } from './task-user/task-user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [TaskUserModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
