import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Env } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);

  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('SEO Tools Rest API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);

  const msApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    CoreModule,
    {
      transport: Transport.REDIS,
      options: Env.REDIS_OPTIONS,
    },
  );
  await msApp.listen();
}
bootstrap();
