import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../providers/database.module';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { propertiesProviders } from '../../providers/properties.providers';
import { userProviders } from '../../providers/user.providers';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';

dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    // MulterModule.register({
    //   dest: `${__dirname}../../../../../real-estate-app-uploads`,
    // }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, ...propertiesProviders, ...userProviders],
})
export class DashboardModule {}
