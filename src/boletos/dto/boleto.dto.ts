import { Transform } from 'class-transformer';
import { ApiResponseProperty } from '@nestjs/swagger';

export class BoletoDto {
  constructor(partial?: Partial<BoletoDto>) {
    Object.assign(this, partial);
  }

  @ApiResponseProperty({ example: '03393902200000120019237608300000048732110101' })
  barCode!: string;

  @ApiResponseProperty({ example: '120.01' })
  amount!: string;

  @ApiResponseProperty({ example: '2022-06-20' })
  @Transform(({ value }: { value: Date }) => value.toISOString().split('T')[0])
  expirationDate!: Date;
}