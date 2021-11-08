import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import compression from 'fastify-compress';
import helmet from 'fastify-helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Constants } from './util/constants';
import fmp = require('fastify-multipart');

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // @ts-ignore
  await app.register(fmp);
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  const configService = app.get(ConfigService);
  //Implementing class validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  const config = new DocumentBuilder()
    .setTitle('Inventario Real')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: Constants.tokens.admin,
        in: 'header',
      },
      'jwt-admin',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: Constants.tokens.dealer,
        in: 'header',
      },
      'jwt-dealer',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: Constants.tokens.cashier,
        in: 'header',
      },
      'jwt-employee',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: Constants.tokens.companyAdmin,
        in: 'header',
      },
      'jwt-company',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: Constants.tokens.admin,
        in: 'header',
      },
      'jwt-admin',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('http.port'));
}

bootstrap();
