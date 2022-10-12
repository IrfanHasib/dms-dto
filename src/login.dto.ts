import {IsNotEmpty, Length, Max, Min} from "class-validator";

export class LoginDTO {
    @IsNotEmpty()
    @Min( 11)
    @Max(11)
    mobile: string;

    @IsNotEmpty()
    @Min(6)
    password: string;
}
