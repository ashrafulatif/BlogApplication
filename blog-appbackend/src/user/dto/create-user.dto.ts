import {
  IsNotEmpty,
  Length,
  IsString,
  IsEmail,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2)
  @IsString()
  name: string;
  @IsNotEmpty()
  @Length(4)
  @IsString()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  phonenumber: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsBoolean()
  isActive?: boolean;
}
