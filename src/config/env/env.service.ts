import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from './env.schema';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService<EnvSchema>) {}

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', { infer: true })!;
  }

  get port(): string {
    return this.configService.get<string>('PORT', { infer: true })!;
  }

  get openAIApiKey(): string {
    return this.configService.get<string>('OPENAI_API_KEY', { infer: true })!;
  }

  get geminiApiKey(): string {
    return this.configService.get<string>('GEMINI_API_KEY', { infer: true })!;
  }
  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET', { infer: true })!;
  }

  get jwtExpiresIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN', { infer: true })!;
  }

  get refreshTokenLength(): number {
    return this.configService.get<number>('REFRESH_TOKEN_LENGTH', {
      infer: true,
    })!;
  }

  get refreshTokenExpiresIn(): string {
    return this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN', {
      infer: true,
    })!;
  }

  get dbHost(): string {
    return this.configService.get<string>('DB_HOST', { infer: true })!;
  }

  get dbPort(): number {
    return this.configService.get<number>('DB_PORT', { infer: true })!;
  }

  get dbUsername(): string {
    return this.configService.get<string>('DB_USERNAME', { infer: true })!;
  }

  get dbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD', { infer: true })!;
  }

  get dbName(): string {
    return this.configService.get<string>('DB_NAME', { infer: true })!;
  }

  get auth0Domain(): string {
    return this.configService.get<string>('AUTH0_DOMAIN', { infer: true })!;
  }

  get auth0Audience(): string {
    return this.configService.get<string>('AUTH0_AUDIENCE', { infer: true })!;
  }
}
