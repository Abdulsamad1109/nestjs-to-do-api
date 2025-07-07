import { IsString } from "class-validator";

export class CreateSigninDto {
    
    @IsString()
    email: string

    @IsString()
    password: string
}
