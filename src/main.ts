import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true, // 全局隐式类型转换，和修饰符 @Type(() => Number..) 行为相同，启用后，就不用再手动使用 @Type() 修饰符显示指定类型
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
