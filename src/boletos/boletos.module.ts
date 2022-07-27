import { Module } from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { BoletosController } from './boletos.controller';

@Module({
  controllers: [BoletosController],
  providers: [BoletosService]
})
export class BoletosModule {}