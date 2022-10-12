import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

 const dtoValidator = async <T extends ClassConstructor<any>>(
    dto: T,
    obj: Object
) => {
    const objInstance = plainToClass(dto, obj);
    const errors = await validate(objInstance);
    if (errors.length > 0) {
        throw new TypeError(
            `validation failed. The error fields : ${errors.map(
                ({ property }) => property
            )}`
        );
    }
};
 export {dtoValidator}
