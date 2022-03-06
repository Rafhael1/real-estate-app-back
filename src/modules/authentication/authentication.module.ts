import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../providers/database.module';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { userProviders } from '../../providers/user.providers';
import { JwtModule } from '@nestjs/jwt';

dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, ...userProviders],
})
export class AuthenticationModule {}
