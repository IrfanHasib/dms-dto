import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { HttpException } from '@nestjs/common';

 const dtoValidator = async <T extends ClassConstructor<any>>(
    dto: T,
    obj: Object
) => {
    const objInstance = plainToClass(dto, obj);
    const errors = await validate(objInstance);
    if (errors.length > 0) {
        throw new HttpException(
            {
                error: `validation failed. The error fields : ${errors.map(
                    ({ property }) => property
                )}`
            },
            401,
        );
    }
};
 export {dtoValidator}
