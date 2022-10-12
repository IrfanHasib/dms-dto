import { ClassConstructor } from 'class-transformer';
declare const responseDtoValidator: (dto: ClassConstructor<any>, obj: Object) => Promise<void>;
export { responseDtoValidator };
