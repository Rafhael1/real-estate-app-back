import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { PublicModule } from './modules/public/public.module';
import { PaginationMiddleware } from './middlewares/pagination.middleware';
import { UserMiddleware } from './middlewares/user-info.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../real-estates-app-uploads'),
    // }),
    ConfigModule.forRoot({ isGlobal: true }),
    DashboardModule,
    AuthenticationModule,
    PublicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes({
      path: '(*)',
      method: RequestMethod.GET,
    });
    consumer.apply(UserMiddleware).forRoutes({
      path: '(*)',
      method: RequestMethod.ALL,
    });
  }
}
