import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { ImgModule } from '@img/img.module';

@Module({
  imports: [AppConfigModule, ImgModule],
})
export class AppModule {}
