import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { usersProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [UsersResolver, UsersService, ...usersProviders],
  imports: [DatabaseModule],
  exports: [UsersService]
})
export class UsersModule {}
