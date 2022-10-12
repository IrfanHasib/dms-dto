import { ClassConstructor } from "class-transformer";
declare const dtoValidator: <T extends ClassConstructor<any>>(dto: T, obj: Object) => Promise<void>;
export { dtoValidator };
