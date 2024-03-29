import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Учёт сданных лабораторных работ')
    .setDescription('Документация API')
    .setVersion('1.0.0')
    .addTag('Labs')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT,
    () => {
      console.log(`Server has been started on port: ${PORT}`);
      console.log(`API docs: http://localhost:5000/api/docs/`);
    });
}
bootstrap();
