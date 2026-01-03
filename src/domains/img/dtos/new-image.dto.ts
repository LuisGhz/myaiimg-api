import { IsString } from 'class-validator';

export class NewImageDto {
  @IsString()
  prompt: string;
}
