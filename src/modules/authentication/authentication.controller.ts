import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterAuthenticationDto } from './dto/register-authentication.dto';
import { LoginAuthenticationDto } from './dto/login-authentication.dto';
import { AuthGuard } from '../../guards/validate.guard';

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

  @UseGuards(AuthGuard)
  @Post('verify-user')
  verifyUser(@Req() request) {
    return this.authenticationService.verifyUser(request.user);
  }
}
