import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import { AllExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());


  await app.listen(3000);
}
bootstrap();
