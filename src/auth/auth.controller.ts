import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async register(@Body() userInput: CreateUserDto) {
    return await this.authService.signUp(userInput);
  }

  @Post('login')
  async login(@Body() userInput: LoginUserDto) {
    return await this.authService.login(userInput);
  }
}
