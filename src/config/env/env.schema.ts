import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().transform(Number),
  OPENAI_API_KEY: z.string(),
  GEMINI_API_KEY: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_LENGTH: z.string().transform(Number),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string().transform(Number),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  AUTH0_DOMAIN: z.string(),
  AUTH0_AUDIENCE: z.string(),
  AWS_S3_REGION: z.string(),
  AWS_S3_BUCKET: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;

export const validateEnv = (env: Record<string, unknown>) => {
  const parsedEnv = envSchema.safeParse(env);
  if (!parsedEnv.success) {
    console.error('Invalid environment variables: ', parsedEnv.error.message);
    throw new Error(
      'Invalid environment variables: ' + parsedEnv.error.message,
    );
  }
  return parsedEnv.data;
};
