import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';

dotenv.config();

@Module({
  imports: [
    MulterModule.register({
      dest: `${__dirname}../../../../../real-estate-app-uploads`,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
