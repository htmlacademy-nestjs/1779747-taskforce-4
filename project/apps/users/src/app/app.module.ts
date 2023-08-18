import { Module } from '@nestjs/common';
import { TaskUserModule } from './task-user/task-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule, getMongooseOptions } from '@project/config/config-users';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthenticationModule,
    TaskUserModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}
