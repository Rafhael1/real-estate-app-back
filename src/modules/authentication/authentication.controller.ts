import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterAuthenticationDto } from './dto/register-authentication.dto';
import { LoginAuthenticationDto } from './dto/login-authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  register(@Body() registerAuthenticationDto: RegisterAuthenticationDto) {
    return this.authenticationService.register(registerAuthenticationDto);
  }

  @Post('login')
  login(@Body() loginAuthenticationDto: LoginAuthenticationDto) {
    return this.authenticationService.login(loginAuthenticationDto);
  }

  @Post('verify-user')
  verifyUser() {
    return this.authenticationService.verifyUser();
  }
}
