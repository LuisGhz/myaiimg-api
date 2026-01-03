import { Body, Controller, Post, Res } from '@nestjs/common';
import { NewImageDto } from './dtos';
import { OpenAIService } from './services';
import type { Response } from 'express';

@Controller('img')
export class ImgController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('openai')
  async getOpenAIImage(@Body() body: NewImageDto, @Res() res: Response) {
    const buffer = await this.openAIService.genImage(body.prompt);
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  }

  @Post('gemini')
  getGeminiImage() {
    return 'This will handle Gemini image requests';
  }
}
