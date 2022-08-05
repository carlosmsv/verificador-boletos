export class Titulo {
  constructor(partial?: Partial<Titulo>) {
    Object.assign(this, partial);
  }

  static readonly dataInicial = 'October 07, 1997';

  codigoDoBanco: string;
  codigoDaMoeda: string;
  digitoVerificador: string;
  fatorDeVencimento: string;
  valor: string;
  campoLivre: string;

  getValor(): number {
    return Number(this.valor) / 100;
  }

  getDataDeVencimento() {
    const dataVencimento = new Date(Titulo.dataInicial);
    dataVencimento.setDate(dataVencimento.getDate() + Number(this.fatorDeVencimento));
    return dataVencimento;
  }

}
