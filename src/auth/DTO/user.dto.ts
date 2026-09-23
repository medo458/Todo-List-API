import { Exclude } from "class-transformer";
import { IsEmail, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class UserDto { 
    @IsString()
    @MaxLength(255)
    name: string;

    @IsString()
    @IsEmail()
    @MaxLength(255)
    email: string;

    @IsString()
    @IsStrongPassword()
    @MaxLength(255)
    password: string;
    
}