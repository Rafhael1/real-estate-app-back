import { Module, CacheModule } from '@nestjs/common';
import { DatabaseModule } from '../../providers/database.module';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { propertiesProviders } from '../../providers/properties.providers';
import { geolocationsProviders } from '../../providers/geolocations.providers';

@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [PublicController],
  providers: [PublicService, ...propertiesProviders, ...geolocationsProviders],
})
export class PublicModule {}
