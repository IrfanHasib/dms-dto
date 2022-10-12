import { ClassConstructor } from "class-transformer";
import {dtoValidator} from "./dtoValidator";

const responseDtoValidator = async <T extends ClassConstructor<any>>(
    dto: T,
    obj: Object
) => {
    let returnError: string[] = await dtoValidator(dto,obj)
    if (returnError.length > 0) {
        returnError = ["Response is not valid", ...returnError]
        throw new Error(returnError?.join(". \n"));
    }
};

 export {responseDtoValidator}
