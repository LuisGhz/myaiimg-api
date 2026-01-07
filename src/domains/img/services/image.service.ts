import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(params: { key: string; userId: string }): Promise<Image> {
    const image = this.imageRepository.create({
      key: params.key,
      userId: params.userId,
    });
    return this.imageRepository.save(image);
  }

  async findAllByUserId(userId: string): Promise<Image[]> {
    return this.imageRepository.find({
      where: { userId, isDeleted: false },
      order: { createdAt: 'DESC' },
    });
  }

  async softDelete(params: { id: string; userId: string; deletedBy: string }) {
    const image = await this.imageRepository.findOne({
      where: { id: params.id, userId: params.userId, isDeleted: false },
    });

    if (!image) throw new NotFoundException('Image not found');

    image.isDeleted = true;
    image.deletedAt = new Date();
    image.deletedBy = params.deletedBy;

    return this.imageRepository.save(image);
  }
}
