import 'reflect-metadata';
import { TransformFnParams, Transform } from 'class-transformer';

function TransformBoolean(): PropertyDecorator {
  return Transform(({ value }: TransformFnParams): boolean => {
    if (typeof value === 'undefined' || value === null) {
      return false;
    }

    // Normalize the value to a lower-case string for case-insensitive comparison
    const stringValue = String(value).toLowerCase();

    return ['true', 'enabled', '1', 'yes'].includes(stringValue) || value === true;
  });
}

export { TransformBoolean };
