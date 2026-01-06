import { Module } from '@nestjs/common';
import { GeminiService, OpenAIService, S3Service } from './services';
import { ImgController } from './img.controller';

@Module({
  imports: [],
  controllers: [ImgController],
  providers: [OpenAIService, GeminiService, S3Service],
})
export class ImgModule {}
