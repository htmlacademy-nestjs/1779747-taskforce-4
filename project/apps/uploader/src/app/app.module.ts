import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { ConfigUploaderModule, getMongooseOptions } from '@project/config/config-uploader';
import { MongooseModule } from '@nestjs/mongoose';



import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    FileModule,
    ConfigUploaderModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
