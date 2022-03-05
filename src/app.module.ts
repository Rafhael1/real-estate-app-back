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

@Module({
  imports: [
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
