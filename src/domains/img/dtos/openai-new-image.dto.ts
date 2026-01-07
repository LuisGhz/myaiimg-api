import { IsIn, IsObject, IsString } from 'class-validator';

export class OpenAIModelOptionsReqDto {
  @IsIn(['1024x1024', '1536x1024', '1024x1536'])
  size: string;
  @IsIn(['low', 'medium', 'high', 'auto'])
  quality: string;
  @IsIn(['natural', 'vivid'])
  style: string;
}

export class OpenAINewImageReqDto {
  @IsString()
  prompt: string;
  @IsIn(['gpt-image-1.5', 'gpt-image-1-mini'])
  model: string;
  @IsObject()
  options: OpenAIModelOptionsReqDto;
}
