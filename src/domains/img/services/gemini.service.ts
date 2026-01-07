import { Injectable } from '@nestjs/common';
import { GoogleGenAI, Part } from '@google/genai';
import { EnvService } from '@config/env';
import { base64toImage } from '@img/util/base64toImage.util';

@Injectable()
export class GeminiService {
  private readonly geminiClient: GoogleGenAI;

  constructor(private readonly envService: EnvService) {
    this.geminiClient = new GoogleGenAI({
      apiKey: this.envService.geminiApiKey,
    });
  }

  async genImage(prompt: string) {
    const res = await this.geminiClient.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const base64 = res.data;
    if (!base64) throw new Error('No image data received from Gemini API');
    return base64toImage(base64);
  }

  async editImage(prompt: string, files: Express.Multer.File[]) {
    const filesPart: Part[] = files.map((file) => ({
      inlineData: {
        mimeType: file.mimetype,
        data: file.buffer.toString('base64'),
      },
    }));
    const res = await this.geminiClient.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
            ...filesPart,
          ],
        },
      ],
    });

    const base64 = res.data;
    if (!base64) throw new Error('No image data received from Gemini API');
    return base64toImage(base64);
  }
}
