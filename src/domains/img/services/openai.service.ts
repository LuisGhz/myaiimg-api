import { Injectable } from '@nestjs/common';
import { EnvService } from '@config/env';
import openAIClient, { toFile } from 'openai';
import { base64toImage } from '@img/util/base64toImage.util';

@Injectable()
export class OpenAIService {
  private openAI: openAIClient;

  constructor(private readonly envService: EnvService) {
    this.openAI = new openAIClient({
      apiKey: this.envService.openAIApiKey,
    });
  }

  async genImage(prompt: string) {
    const res = await this.openAI.images.generate({
      model: 'gpt-image-1-mini',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'low',
    });

    if (!res.data?.[0]?.b64_json)
      throw new Error('Image generation failed: No data returned from OpenAI');

    return base64toImage(res.data[0].b64_json);
  }

  async editImage(image: Express.Multer.File, prompt: string) {
    const filename = image.originalname ?? 'image.png';
    const mimeType = image.mimetype ?? 'image/png';

    const cImage = await toFile(image.buffer, filename, { type: mimeType });

    const res = await this.openAI.images.edit({
      model: 'gpt-image-1-mini',
      image: [cImage],
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'low',
    });

    if (!res.data?.[0]?.b64_json)
      throw new Error('Image editing failed: No data returned from OpenAI');

    return base64toImage(res.data[0].b64_json);
  }
}
