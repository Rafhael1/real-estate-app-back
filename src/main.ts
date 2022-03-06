import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import morgan = require('morgan');
import helmet from 'helmet';
import { ResponseFormatterInterceptor } from './interceptors/format-content.interceptor';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';

const PORT = process.env.REAL_ESTATE_API_PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: console,
  });

  app.useStaticAssets(join(`${__dirname}/../../real-estate-app-uploads`), {
    prefix: '/api/images/',
  });
  app.enableCors();
  app.use(helmet());
  app.use(morgan('tiny'));

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalInterceptors(new ResponseFormatterInterceptor());

  await app.listen(PORT, () => {
    Logger.log(`The real-estate api is now running on port: ${PORT}`);
  });
}
bootstrap();
