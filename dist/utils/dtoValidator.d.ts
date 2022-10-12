import { ClassConstructor } from 'class-transformer';
declare const dtoValidator: (dto: ClassConstructor<any>, obj: Object) => Promise<string[]>;
export { dtoValidator };
