import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterAuthenticationDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
