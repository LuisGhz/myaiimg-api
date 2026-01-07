import { IsIn, IsString } from 'class-validator';

export class GeminiModelOptionsReqDto {
  @IsIn(['1k', '2k', '4k'])
  size: string;
  @IsIn([
    '21:9',
    '16:9',
    '4:3',
    '3:2',
    '1:1',
    '9:16',
    '3:4',
    '2:3',
    '5:4',
    '4:5',
  ])
  aspectRation: string;
}

export class GeminiNewImageReqDto {
  @IsString()
  prompt: string;
  @IsIn(['gemini-2.5-flash-image', 'gemini-3-pro-image-preview'])
  model: string;
  options: GeminiModelOptionsReqDto;
}
