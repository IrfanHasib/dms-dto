import { ClassConstructor } from 'class-transformer';
import { dtoValidator } from './dtoValidator';

const responseDtoValidator = async (dto: ClassConstructor<any>, obj: Object) => {
  let returnError: string[] = await dtoValidator(dto, obj);
  if (returnError.length > 0) {
    returnError = ['Response is not valid', ...returnError];
    throw new Error(returnError?.join('. \n'));
  }
};

export { responseDtoValidator };
