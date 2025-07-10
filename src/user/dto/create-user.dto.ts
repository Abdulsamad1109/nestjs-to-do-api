import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/auth/roles.enum";

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
    @IsEnum(Role, {each: true})
    role: Role[]
}
