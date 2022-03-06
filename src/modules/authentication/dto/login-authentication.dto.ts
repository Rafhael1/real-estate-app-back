import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAuthenticationDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
