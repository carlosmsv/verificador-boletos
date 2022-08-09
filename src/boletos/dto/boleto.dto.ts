import { Transform } from 'class-transformer';
import { ApiResponseProperty } from '@nestjs/swagger';

export class BoletoDto {
  constructor(partial?: Partial<BoletoDto>) {
    Object.assign(this, partial);
  }

  @ApiResponseProperty({ example: '21290001192110001210904475617405975870000002000' })
  barCode!: string;

  @ApiResponseProperty({ example: '20.00' })
  amount!: string;

  @ApiResponseProperty({ example: '2018-07-16' })
  @Transform(({ value }: { value: Date }) => value.toISOString().split('T')[0])
  expirationDate?: Date;
}