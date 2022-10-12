import {IsNotEmpty, Length, Max, Min} from "class-validator";

class LoginDto {
    @IsNotEmpty()
    @Min( 11)
    @Max(11)
    mobile: string;

    @IsNotEmpty()
    @Min(6)
    password: string;
}
