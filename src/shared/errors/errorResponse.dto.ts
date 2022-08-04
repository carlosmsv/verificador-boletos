import { ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiResponseProperty({ example: 400 })
  statusCode!: number;

  @ApiResponseProperty()
  message!: string;

  @ApiPropertyOptional({ example: 'Bad Request' })
  error?: string;
}