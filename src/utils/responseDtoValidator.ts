import { ClassConstructor, plainToInstance } from 'class-transformer';
import { dtoValidator } from './dtoValidator';

const responseDtoValidator = async <T>(dto: ClassConstructor<any>, obj: Object): Promise<T> => {
  let returnError: string[] = await dtoValidator(dto, obj);
  if (returnError.length > 0) {
    returnError = ['Response is not valid', ...returnError];
    throw new Error(returnError?.join('. \n'));
  }
  return plainToInstance(dto, obj);
};

export { responseDtoValidator };
