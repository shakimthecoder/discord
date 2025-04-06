import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://127.0.0.1:5173', 'http:///localhost:5173'],
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ]
  }),
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10}))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
