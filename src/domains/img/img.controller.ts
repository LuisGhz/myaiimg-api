import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewImageDto } from './dtos';
import { OpenAIService } from './services';
import type { Response } from 'express';

@Controller('img')
export class ImgController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('openai')
  @UseInterceptors(FileInterceptor('image'))
  async getOpenAIImage(
    @Body() body: NewImageDto,
    @Res() res: Response,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<void> {
    let buffer: Buffer<ArrayBufferLike> | undefined;
    if (file) buffer = await this.openAIService.editImage(file, body.prompt);
    else buffer = await this.openAIService.genImage(body.prompt);

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  }

  @Post('gemini')
  getGeminiImage() {
    return 'This will handle Gemini image requests';
  }
}
