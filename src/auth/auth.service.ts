import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async signUp(userInput: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userInput.password, saltOrRounds);
    const newUser = await this.userService.create({
      ...userInput,
      password: hashedPassword,
    });
    newUser.password = undefined;
    return newUser;
  }

  public async login(userInput: LoginUserDto) {
    try {
      const user = await this.userService.getByEmail(userInput.email);
      const isMatch = await bcrypt.compare(userInput.password, user.password);
      if (!isMatch) {
        throw new HttpException('wrong password', HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (e) {
      throw new HttpException(
        'wrong credential provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
