export class Convenio {
  constructor(partial?: Partial<Convenio>) {
    Object.assign(this, partial);
  }

  produto: string;
  segmento: string;
  identificadorValorEfetivoOuReferencia: string;
  digitoVerificador: string;
  valor: string;
  empresaOrgao: string;
  cnpjMF: string;
  campoLivre: string;

  getValor(): string {
    return (Number(this.valor) / 100).toFixed(2);
  }

}
