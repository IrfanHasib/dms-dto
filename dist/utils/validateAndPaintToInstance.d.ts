import { ClassConstructor } from 'class-transformer';
import 'reflect-metadata';
declare const validateAndPaintToInstance: <T>(dto: ClassConstructor<T>, obj: T) => Promise<T>;
export { validateAndPaintToInstance };
