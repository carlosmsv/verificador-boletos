import { Get, Param, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BoletosService } from './boletos.service';

@Controller('boleto')
@ApiTags('Boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  @Get(':codigo')
  getInfo(@Param('codigo') codigo: string) {
    return codigo;
  }
}