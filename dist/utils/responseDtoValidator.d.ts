import { ClassConstructor } from 'class-transformer';
declare const responseDtoValidator: <T>(dto: ClassConstructor<any>, obj: Object) => Promise<T>;
export { responseDtoValidator };
