import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ErrorMessages } from './errorMessages.enum';

@Injectable()
export class CodigoDeBarrasValidator implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const length = [...value].length;
    if (length !== 44) {
      if (length > 44) {
        throw new BadRequestException(ErrorMessages.MAIOR_QUE_44);
      }
      throw new BadRequestException(ErrorMessages.MENOR_QUE_44);
    }
    return value;
  }
}