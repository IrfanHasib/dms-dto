import { ClassConstructor } from "class-transformer";
declare const responseDtoValidator: <T extends ClassConstructor<any>>(dto: T, obj: Object) => Promise<void>;
export { responseDtoValidator };
