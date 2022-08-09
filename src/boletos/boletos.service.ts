import { Injectable } from '@nestjs/common';
import { Titulo } from './entities/titulo';
import { Convenio } from './entities/convenio';
import { BoletoDto } from './dto/boleto.dto';

@Injectable()
export class BoletosService {
  lerLinhaDigitavel(linhaDigitavel: string): BoletoDto{
    if (linhaDigitavel[0] === '8') {
      return this.lerConvenio(linhaDigitavel);
    }
    return this.lerTitulo(linhaDigitavel);
  }

  private lerConvenio(linhaDigitavel: string): BoletoDto {
    const codigo1 = linhaDigitavel.slice(0, 11);
    const codigo2 = linhaDigitavel.slice(12, 23);
    const codigo3 = linhaDigitavel.slice(24, 35);
    const codigo4 = linhaDigitavel.slice(36, 47);

    const codigoDeBarras = codigo1 + codigo2 + codigo3 + codigo4;

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

  private lerTitulo(linhaDigitavel: string): BoletoDto {
    const campoLivre1 = linhaDigitavel.slice(4, 9);
    const campoLivre2 = linhaDigitavel.slice(10, 20);
    const campoLivre3 = linhaDigitavel.slice(21, 31);

    const titulo = new Titulo({
      codigoDoBanco: linhaDigitavel.slice(0, 3),
      codigoDaMoeda: linhaDigitavel[3],
      digitoVerificador: linhaDigitavel[32],
      fatorDeVencimento: linhaDigitavel.slice(33, 37),
      valor: linhaDigitavel.slice(37),
      campoLivre: campoLivre1 + campoLivre2 + campoLivre3,
    });
    
    const codigoDeBarras = titulo.codigoDoBanco + titulo.codigoDaMoeda + titulo.digitoVerificador + titulo.fatorDeVencimento + titulo.valor + titulo.campoLivre;

    return new BoletoDto({
      amount: titulo.getValor(),
      barCode: codigoDeBarras,
      expirationDate: titulo.getDataDeVencimento(),
    });
  }
}