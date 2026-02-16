// ** NestJs
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module
import { AppModule } from './app.module';

// ** Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // config versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  const descSwagger = `
  [ Base URL: api.templatefree.io.vn/api/v1 ]

  [templatefree.io.vn](https://templatefree.io.vn) Website template free.`;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Template Free API')
    .setDescription(descSwagger)
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter access token',
        in: 'header',
      },
      'access-token',
    )

    // ===== TAG DESCRIPTIONS =====

    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Template Free API Document',
  });

  // Listen
  const port = configService.get<string>('PORT');
  await app.listen(port || 4000);
}

bootstrap();
