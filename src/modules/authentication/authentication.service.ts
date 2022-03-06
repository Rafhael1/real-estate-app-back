import { Model } from 'mongoose';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from './interfaces/user.interface';
import { RegisterAuthenticationDto } from './dto/register-authentication.dto';
import { LoginAuthenticationDto } from './dto/login-authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthenticationDto: RegisterAuthenticationDto) {
    const { email, password } = registerAuthenticationDto;

    const userExists = await this.userModel.find({ email: email });

    if (userExists) {
      throw new UnauthorizedException({
        userMessage: 'Email already taken! Try a different one.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const createUser = new this.userModel({
      ...registerAuthenticationDto,
      password: encryptedPassword,
    });
    await createUser.save();

    return 'This action adds a new authentication';
  }

  async login(loginAuthenticationDto: LoginAuthenticationDto) {
    const { email, password } = loginAuthenticationDto;

    const user = await this.userModel.findOne({ email: email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException({
        userMessage: 'Email or password is invalid.',
      });
    }

    const token = this.jwtService.sign({ __id: user.id });

    return {
      authToken: token,
      userMessage: 'Logged in successfully',
    };
  }

  async verifyUser(userId: string) {
    const verifyUser = await this.userModel.findOne({ _id: userId });

    return {
      data: {
        user: verifyUser,
        isLogged: verifyUser ? true : false,
      },
    };
  }
}
