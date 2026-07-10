import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async register(registerDto: RegisterDto) {
    return {
      message: 'Register endpoint working',
      data: registerDto,
    };
  }

  async login(loginDto: LoginDto) {
    return {
      message: 'Login endpoint working',
      data: loginDto,
    };
  }
}