import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { SignUpUserInput } from './dto/signup-user.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new Error('Invalid email or password.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result} = user;
      return result.dataValues;
    }
    return null;
  }

  generateToken(payload) {
    return {
      access_token: this.jwtService.sign(payload),
      expired_at: (Number(new Date().getTime()) + 3600000)
    }
  }

  async login(user: User) {
    console.log(user)
    const payload = {email: user.email, id: user.id};
    return {
      access_token: this.jwtService.sign(payload),
      expired_at: (Number(new Date().getTime()) + 3600000),
      user
    }
  }

  async signup(signupUserInput: SignUpUserInput) {
    const user = await this.usersService.findOne(signupUserInput.email);
    if (user) {
      throw new Error('User already exists.');
    }
    const hashPassword = await bcrypt.hash(signupUserInput.password, 10);
    const newUser = (await this.usersService.create({
      ...signupUserInput,
      password: hashPassword
    })).dataValues;
    const payload = {email: newUser.email, id: newUser.id};
    return {
      access_token: this.jwtService.sign(payload),
      expired_at: (Number(new Date().getTime()) + 3600000),
      user: newUser
    }
  }
}
