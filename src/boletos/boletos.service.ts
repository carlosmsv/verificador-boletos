import { Injectable } from '@nestjs/common';
import { Titulo } from './entities/titulo';
import { Convenio } from './entities/convenio';
import { BoletoDto } from './dto/boleto.dto';

@Injectable()
export class BoletosService {
  lerLinhaDigitavel(linhaDigitavel: string): BoletoDto {
    if (linhaDigitavel[0] === '8') {
      return this.lerConvenio(linhaDigitavel);
    }
    return this.lerTitulo(linhaDigitavel);
  }

  private lerConvenio(linhaDigitavel: string): BoletoDto {
    const convenio = new Convenio({
      produto: linhaDigitavel[0],
      segmento: linhaDigitavel[1],
      identificadorValorEfetivoOuReferencia: linhaDigitavel[2],
      digitoVerificador: linhaDigitavel[3],
      valor: linhaDigitavel.slice(4, 15),
      empresaOrgao: linhaDigitavel.slice(15, 19),
      cnpjMF: linhaDigitavel.slice(15, 23),
      campoLivre: linhaDigitavel.slice(22),
    });

    return new BoletoDto({
      amount: convenio.getValor(),
      barCode: linhaDigitavel,
    });
  }

  private lerTitulo(linhaDigitavel: string): BoletoDto {
    const boleto = new Titulo({
      codigoDoBanco: linhaDigitavel.slice(0, 3),
      codigoDaMoeda: linhaDigitavel[3],
      digitoVerificador: linhaDigitavel[4],
      fatorDeVencimento: linhaDigitavel.slice(5, 9),
      valor: linhaDigitavel.slice(9, 19),
      campoLivre: linhaDigitavel.slice(18),
    });

    return new BoletoDto({
      amount: boleto.getValor(),
      barCode: linhaDigitavel,
      expirationDate: boleto.getDataDeVencimento(),
    });
  }
}