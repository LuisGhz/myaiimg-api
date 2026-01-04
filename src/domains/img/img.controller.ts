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
import { GeminiService, OpenAIService } from './services';
import type { Response } from 'express';

@Controller('img')
export class ImgController {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly geminiService: GeminiService,
  ) {}

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
  @UseInterceptors(FileInterceptor('image'))
  async getGeminiImage(
    @Body() body: NewImageDto,
    @Res() res: Response,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let buffer: Buffer<ArrayBufferLike> | undefined;
    if (file) buffer = await this.geminiService.editImage(file, body.prompt);
    else buffer = await this.geminiService.genImage(body.prompt);

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  }
}
