import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../providers/database.module';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { propertiesProviders } from '../../providers/properties.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PublicController],
  providers: [PublicService, ...propertiesProviders],
})
export class PublicModule {}
