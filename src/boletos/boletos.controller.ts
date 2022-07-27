import { ClassSerializerInterceptor, Get, UseInterceptors, Param, Controller } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BoletosService } from './boletos.service';
import { BoletoDto } from './dto/boleto.dto';

@Controller('boleto')
@ApiTags('Boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':codigo')
  @ApiOkResponse({
    status: 200,
    type: BoletoDto,
    description: 'Ok: Retorna as informações do boleto',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Código de barras inválido',
  })
  getInfo(@Param('codigo') barCode: string): BoletoDto {
    return new BoletoDto({ barCode, amount: 20.01, expirationDate: new Date() });
  }
}