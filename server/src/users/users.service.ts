import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) {}

  async create(createUserInput: CreateUserInput) {
    return await this.usersRepository.create(createUserInput);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne({ where: {email} });
  }
}
