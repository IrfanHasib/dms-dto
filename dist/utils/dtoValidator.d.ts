import { ClassConstructor } from 'class-transformer';
/**
Obj should not be empty, if there are no field then pass {}
 */
declare const dtoValidator: <T>(dto: ClassConstructor<T>, obj: T) => Promise<string[]>;
export { dtoValidator };
