import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileuploadController } from './fileupload.controller';
import { FileuploadService } from './fileupload.service';

@Module({
  imports: [],
  controllers: [FileuploadController],
  providers: [FileuploadService]
})
export class FileuploadModule { }
