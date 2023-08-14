import { Module } from '@nestjs/common';
import { TaskUserModule } from './task-user/task-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule } from '@project/config/config-users';

@Module({
  imports: [TaskUserModule, AuthenticationModule, ConfigUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
