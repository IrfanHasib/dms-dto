import { ClassConstructor } from 'class-transformer';
declare const validateAndPaintToInstance: <T>(dto: ClassConstructor<T>, obj: T) => Promise<T>;
export { validateAndPaintToInstance };
