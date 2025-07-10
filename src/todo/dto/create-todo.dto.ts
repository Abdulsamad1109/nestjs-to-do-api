import { Type } from "class-transformer";
import {IsInt, IsString} from "class-validator";

export class CreateTodoDto {

    @IsString()
    title: string

    @IsString()
    description: string
 
}
