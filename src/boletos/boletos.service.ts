import { Injectable } from '@nestjs/common';
import { Titulo } from './entities/titulo';
import { Convenio } from './entities/convenio';
import { BoletoDto } from './dto/boleto.dto';

@Injectable()
export class BoletosService {
  lerCodigoDeBarras(codigoDeBarras: string): BoletoDto {
    if (codigoDeBarras[0] === '8') {
      return this.lerConvenio(codigoDeBarras);
    }
    return this.lerTitulo(codigoDeBarras);
  }

  private lerConvenio(codigoDeBarras: string): BoletoDto {
    const convenio = new Convenio({
      produto: codigoDeBarras[0],
      segmento: codigoDeBarras[1],
      identificadorValorEfetivoOuReferencia: codigoDeBarras[2],
      digitoVerificador: codigoDeBarras[3],
      valor: codigoDeBarras.slice(4, 15),
      empresaOrgao: codigoDeBarras.slice(15, 19),
      cnpjMF: codigoDeBarras.slice(15, 23),
      campoLivre: codigoDeBarras.slice(22),
    });

    return new BoletoDto({
      amount: convenio.getValor(),
      barCode: codigoDeBarras,
    });
  }

  private lerTitulo(codigoDeBarras: string): BoletoDto {
    const boleto = new Titulo({
      codigoDoBanco: codigoDeBarras.slice(0, 3),
      codigoDaMoeda: codigoDeBarras[3],
      digitoVerificador: codigoDeBarras[4],
      fatorDeVencimento: codigoDeBarras.slice(5, 9),
      valor: codigoDeBarras.slice(9, 19),
      campoLivre: codigoDeBarras.slice(18),
    });

    return new BoletoDto({
      amount: boleto.getValor(),
      barCode: codigoDeBarras,
      expirationDate: boleto.getDataDeVencimento(),
    });
  }
}