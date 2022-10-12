import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const dtoValidator = async (dto: ClassConstructor<any>, obj: Object): Promise<string[]> => {
  const objInstance = plainToInstance(dto, obj);
  const errors = await validate(objInstance);
  let returnError: string[] = [];
  if (errors.length > 0) {
    returnError.push('Response is not valid');
    errors?.map(({ constraints }) => {
      Object.values(constraints as Object)?.map(i => {
        returnError.push(i);
      });
    });
  }
  return returnError;
};

export { dtoValidator };
