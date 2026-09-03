import 'dotenv/config'
import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Articles CRUD API')
    .setDescription('Production-grade raw NestJS CRUD engine backed by PostgreSQL')
    .setVersion('1.0')
    .addTag('Articles', 'Operations related to article management')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)

  await app.listen(port);
  console.log(`[Bootstrap] Application running on http://localhost:${port}`);
  console.log(`[Swagger] Documentation live at: http://localhost:${port}/api`)
}

bootstrap();
