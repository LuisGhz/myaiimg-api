import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GeminiNewImageReqDto, OpenAINewImageReqDto } from './dtos';
import { GeminiService, OpenAIService, S3Service } from './services';
import type { Response } from 'express';
import { User } from '@common/decorators';
import type { JwtPayload } from '@core/strategies/interfaces';

@Controller('img')
export class ImgController {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly geminiService: GeminiService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('openai')
  @UseInterceptors(FileInterceptor('image'))
  async getOpenAIImage(
    @Body() body: OpenAINewImageReqDto,
    @Res() res: Response,
    @User() user: JwtPayload,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<void> {
    let buffer: Buffer<ArrayBufferLike> | undefined;
    if (file) buffer = await this.openAIService.editImage(file, body.prompt);
    else buffer = await this.openAIService.genImage(body.prompt);

    await this.s3Service.uploadImage(buffer, user.sub);

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  }

  @Post('gemini')
  @UseInterceptors(FileInterceptor('image'))
  async getGeminiImage(
    @Body() body: GeminiNewImageReqDto,
    @Res() res: Response,
    @User() user: JwtPayload,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let buffer: Buffer<ArrayBufferLike> | undefined;
    if (file) buffer = await this.geminiService.editImage(file, body.prompt);
    else buffer = await this.geminiService.genImage(body.prompt);

    await this.s3Service.uploadImage(buffer, user.sub);

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  }
}
