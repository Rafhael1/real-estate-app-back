import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import compression from 'compression';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseFormatterInterceptor } from './interceptors/format-content.interceptor';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';

import { join } from 'path';
import morgan = require('morgan');
import helmet from 'helmet';
import { json } from 'body-parser';

declare const module: any;

const PORT = process.env.REAL_ESTATE_API_PORT;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: console,
	});

	app.useStaticAssets(join(`${__dirname}/../../real-estate-app-uploads`), {
		prefix: '/api/images/',
	});
	app.use(json({ limit: '5mb' }));
	app.enableCors();
	app.use(compression());
	app.use(helmet());
	app.use(morgan('common'));

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

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();
