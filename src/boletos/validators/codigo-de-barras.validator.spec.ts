import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ErrorMessages } from './errorMessages.enum';
import { CodigoDeBarrasValidator } from './codigo-de-barras.validator';

describe('CodigoDeBarrasValidator', () => {
  let validator: CodigoDeBarrasValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodigoDeBarrasValidator],
    }).compile();

    validator = module.get<CodigoDeBarrasValidator>(CodigoDeBarrasValidator);
  });

  test('Deve estar definido', () => {
    expect(validator).toBeDefined();
  });

  describe('Dado um valor para o código de barras', () => {
    describe('Quando o valor contém apenas números', () => {
      const value = '12345678901234567890123456789012345678901234';
      it('Deve retornar o valor passado', () => {
        expect(validator.transform(value, {} as any)).toBe<string>(value);
      });
    });

    describe('Quando o código de barras tem tamanho MENOR do que 44 caracteres', () => {
      const value = '1234567890123456789012345678901234567890123';
      it('deve lançar uma exceção do tipo Bad Request com o erro de Menor-Que-44', () => {
        expect(() => validator.transform(value, {} as any)).toThrowError(
          new BadRequestException(ErrorMessages.MENOR_QUE_44),
        );
      });
    });

    describe('Quando o código de barras tem tamanho MAIOR do que 44 caracteres', () => {
      const value = '123456789012345678901234567890123456789012345';
      it('deve lançar uma exceção do tipo Bad Request com o erro de Maior-Que-44', () => {
        expect(() => validator.transform(value, {} as any)).toThrowError(
          new BadRequestException(ErrorMessages.MAIOR_QUE_44),
        );
      });
    });
  });
});