import { ClassConstructor, plainToInstance } from 'class-transformer';
import { dtoValidator } from './dtoValidator';

const validateAndPaintToInstance = async <T>(dto: ClassConstructor<T>, obj: T): Promise<T> => {
  let returnError: string[] = await dtoValidator<T>(dto, obj);
  if (returnError.length > 0) {
    returnError = ['Response is not valid', ...returnError];
    throw new Error(returnError?.join('. \n'));
  }
  return plainToInstance<T, T>(dto, obj, { exposeDefaultValues: true, enableImplicitConversion: true });
};

export { validateAndPaintToInstance };
