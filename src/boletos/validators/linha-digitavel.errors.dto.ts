import { ApiResponseProperty } from '@nestjs/swagger';
import { ErrorResponseDto } from '../../shared/errors/errorResponse.dto';
import { ErrorMessages } from './errorMessages.enum';

export class LinhaDigitavelErrorResponseDto extends ErrorResponseDto {
  @ApiResponseProperty({
    enum: ErrorMessages,
  })
  message!: ErrorMessages;
}