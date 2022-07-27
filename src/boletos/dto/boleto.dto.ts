import { Transform } from 'class-transformer';
import { ApiResponseProperty } from '@nestjs/swagger';

export class BoletoDto {
  constructor(partial?: Partial<BoletoDto>) {
    Object.assign(this, partial);
  }

  @ApiResponseProperty({ example: '03399237650830000004287318101018289300000012000' })
  barCode!: string;

  @ApiResponseProperty({ example: '120.00' })
  amount!: number;

  @ApiResponseProperty({ example: '2022-07-27' })
  @Transform(({ value }: { value: Date }) => value.toISOString().split('T')[0])
  expirationDate!: Date;
}