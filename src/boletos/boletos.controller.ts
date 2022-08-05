import { BadRequestException, ClassSerializerInterceptor, Type, Get, UseInterceptors, Param, Controller } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BoletosService } from './boletos.service';
import { BoletoDto } from './dto/boleto.dto';
import { ErrorMessages } from './validators/errorMessages.enum';
import { CodigoDeBarrasErrorResponseDto } from './validators/codigo-de-barras.errors.dto';
import { CodigoDeBarrasValidator } from './validators/codigo-de-barras.validator'

@Controller('boleto')
@ApiTags('Boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':codigoDeBarras')
  @ApiOkResponse({
    status: 200,
    type: BoletoDto,
    description: 'OK: Retorna as informações do boleto',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Código de barras inválido',
    type: CodigoDeBarrasErrorResponseDto,
  })
  getInfo(@Param('codigoDeBarras', CodigoDeBarrasValidator) codigoDeBarras: string): BoletoDto {
    return new BoletoDto({ barCode: codigoDeBarras, amount: 20.01, expirationDate: new Date() });
  }
}