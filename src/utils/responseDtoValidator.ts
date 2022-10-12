import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

const responseDtoValidator = async <T extends ClassConstructor<any>>(
    dto: T,
    obj: Object
) => {
    const objInstance = plainToClass(dto, obj);
    const errors = await validate(objInstance);
    if (errors.length > 0) {

        let returnError: string[] = ["Response is not valid"]
        errors?.map(
            ({  constraints }) => {
                Object.values(constraints as Object)?.map(i=>{
                    returnError.push(i)
                })
            }
        );
        throw new Error(returnError?.join(". \n"));
    }
};

 export {responseDtoValidator}
