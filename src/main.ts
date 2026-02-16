// ** NestJs
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module
import { AppModule } from './app.module';

// ** Guard & Interceptor
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';

// ** Cookies Parser
import cookieParser from 'cookie-parser';

// ** Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  // url
  const feClientUrl = configService.get<string>('FE_CLIENT_URL') as string;
  const feAdminUrl = configService.get<string>('FE_ADMIN_URL') as string;

  // Global guard & Interceptor
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // config cookies
  app.use(cookieParser());

  // config cors
  app.enableCors({
    origin: [feClientUrl, feAdminUrl],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

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
    .addTag(
      'authentication',
      'Admin authentication',
    )
    .addTag(
      'user',
      'User management',
    )
    .addTag(
      'image',
      'Image',
    )
    .addTag(
      'upload',
      'Image upload',
    )

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
