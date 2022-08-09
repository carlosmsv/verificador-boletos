import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ErrorMessages } from './errorMessages.enum';

@Injectable()
export class LinhaDigitavelValidator implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const valorNaoNumerico = (value as string).search(/[^0-9]/) !== -1;
    
    if (valorNaoNumerico) {
      throw new BadRequestException(ErrorMessages.NAO_NUMERICO);
    }

    const length = [...value].length;
    if (length !== 47 && length!== 48) {
      if (length > 48) {
        throw new BadRequestException(ErrorMessages.MAIOR_QUE_NORMAL);
      }
      throw new BadRequestException(ErrorMessages.MENOR_QUE_NORMAL);
    }
    
    return value;
  }
}