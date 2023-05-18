import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';
import { todosProviders } from './todos.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [TodosResolver, TodosService, ...todosProviders],
  imports: [DatabaseModule]
})
export class TodosModule {}
