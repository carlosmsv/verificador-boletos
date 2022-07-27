import { Transform } from 'class-transformer';

export class BoletoDto {
  constructor(partial?: Partial<BoletoDto>) {
    Object.assign(this, partial);
  }

  barCode!: string;
  amount!: number;

  @Transform(({ value }: { value: Date }) => value.toISOString().split('T')[0])
  expirationDate!: Date;
}