import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

const dtoValidator = async <T extends ClassConstructor<any>>(
    dto: T,
    obj: Object
) => {
    const objInstance = plainToClass(dto, obj);
    const errors = await validate(objInstance);
    let returnError: string[] =[]
    if (errors.length > 0) {
        returnError.push("Response is not valid")
        errors?.map(
            ({  constraints }) => {
                Object.values(constraints as Object)?.map(i=>{
                    returnError.push(i)
                })
            }
        );
    }
    return returnError
};

 export {dtoValidator}
