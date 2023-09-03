import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { ConfigUploaderModule } from '@project/config/config-uploader';


import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    FileModule,
    ConfigUploaderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
