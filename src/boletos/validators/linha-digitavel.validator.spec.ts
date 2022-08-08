import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ErrorMessages } from './errorMessages.enum';
import { LinhaDigitavelValidator } from './linha-digitavel.validator';

describe('LinhaDigitavelValidator', () => {
  let validator: LinhaDigitavelValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinhaDigitavelValidator],
    }).compile();

    validator = module.get<LinhaDigitavelValidator>(LinhaDigitavelValidator);
  });

  test('Deve estar definido', () => {
    expect(validator).toBeDefined();
  });

  describe('Dado um valor para a linha digitável', () => {
    describe('Quando o valor contém apenas números, e 47 ou 48 caracteres', () => {
      const value47 = '12345678901234567890123456789012345678901234567';
      it('Deve retornar o valor passado (47 caracteres)', () => {
        expect(validator.transform(value47, {} as any)).toBe<string>(value47);
      });
      const value48 = '123456789012345678901234567890123456789012345678';
      it('Deve retornar o valor passado (48 caracteres)', () => {
        expect(validator.transform(value48, {} as any)).toBe<string>(value48);
      });
    });

    describe('Quando a linha digitável contém apenas números, e tamanho MENOR do que 47 caracteres', () => {
      const value = '1234567890123456789012345678901234567890123';
      it('deve lançar uma exceção do tipo Bad Request com o erro de Menor-Que-Esperado', () => {
        expect(() => validator.transform(value, {} as any)).toThrowError(
          new BadRequestException(ErrorMessages.MENOR_QUE_NORMAL),
        );
      });
    });

    describe('Quando o linha digitável tem tamanho MAIOR do que 48 caracteres', () => {
      const value = '123456789012345678901234567890123456789012345';
      it('deve lançar uma exceção do tipo Bad Request com o erro de Maior-Que-Esperado', () => {
        expect(() => validator.transform(value, {} as any)).toThrowError(
          new BadRequestException(ErrorMessages.MAIOR_QUE_NORMAL),
        );
      });
    });

    describe('Quando o linha digitável contém caracteres que não são números', () => {
      const value = 'a1234560123abc123444dasdasd';
      it('deve lançar uma exceção do tipo Bad Request com o erro de Não-Numérico', () => {
        expect(() => validator.transform(value, {} as any)).toThrow(
          new BadRequestException(ErrorMessages.NAO_NUMERICO),
        );
      });
    });

  });
});