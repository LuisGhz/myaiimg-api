import { Module } from '@nestjs/common';
import { GeminiService, OpenAIService } from './services';
import { ImgController } from './img.controller';

@Module({
  controllers: [ImgController],
  providers: [OpenAIService, GeminiService],
})
export class ImgModule {}
