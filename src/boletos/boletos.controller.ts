import { ClassSerializerInterceptor, Get, UseInterceptors, Param, Controller } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BoletosService } from './boletos.service';
import { BoletoDto } from './dto/boleto.dto';
import { LinhaDigitavelErrorResponseDto } from './validators/linha-digitavel.errors.dto';
import { LinhaDigitavelValidator } from './validators/linha-digitavel.validator'

@Controller('boleto')
@ApiTags('Boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':LinhaDigitavel')
  @ApiOkResponse({
    status: 200,
    type: BoletoDto,
    description: 'OK: Retorna as informações do boleto',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Linha digitável inválida',
    type: LinhaDigitavelErrorResponseDto,
  })
  getInfo(@Param('LinhaDigitavel', LinhaDigitavelValidator) LinhaDigitavel: string): BoletoDto {
    return this.boletosService.lerLinhaDigitavel(LinhaDigitavel)
  }
}