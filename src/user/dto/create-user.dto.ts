import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "src/auth/roles.enum";

export class CreateUserDto {

    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsArray()
    @ArrayNotEmpty()
    @IsNotEmpty()
    @IsEnum(Roles, {each: true})
    roles: Roles[]
}
