import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BoletosModule } from './boletos/boletos.module';

@Module({
  imports: [BoletosModule],
  controllers: [AppController],
})
export class AppModule {}