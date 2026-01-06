import { Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { EnvService } from '@config/env';
import { randomBytes } from 'crypto';

@Injectable()
export class S3Service {
  #logger = new Logger(S3Service.name);
  #s3Client: S3Client;
  #bucket: string;

  constructor(private readonly envService: EnvService) {
    this.#s3Client = new S3Client({
      region: this.envService.awsS3Region,
      credentials: {
        accessKeyId: this.envService.awsAccessKeyId,
        secretAccessKey: this.envService.awsSecretAccessKey,
      },
    });
    this.#bucket = this.envService.awsS3Bucket;
  }

  async uploadImage(buffer: Buffer, userSub: string): Promise<string> {
    const normalizedUserSub = userSub.replace(/\|/g, '-');
    const randomString = randomBytes(5).toString('hex');
    const date = new Date().toISOString().split('T')[0];
    const key = `myaiimg/${normalizedUserSub}/${randomString}-${date}.png`;

    try {
      const command = new PutObjectCommand({
        Bucket: this.#bucket,
        Key: key,
        Body: buffer,
        ContentType: 'image/png',
      });

      await this.#s3Client.send(command);
      this.#logger.log(`Successfully uploaded image to S3: ${key}`);
      return key;
    } catch (error) {
      this.#logger.error('Failed to upload image to S3', error);
      throw error;
    }
  }
}
