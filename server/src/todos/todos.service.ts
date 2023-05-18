import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @Inject('TODOS_REPOSITORY')
    private todosRepository: typeof Todo
  ) {}

  async create(createTodoInput: CreateTodoInput) {
    return await this.todosRepository.create(createTodoInput);
  }

  async findAll() {
    return await this.todosRepository.findAll<Todo>();
  }

  async update(id: number, updateTodoInput: UpdateTodoInput) {
    const result = await this.todosRepository.update (
      {isDone: updateTodoInput.isDone},
      {
        where: { id: id }, 
        returning: true
      }
    );
    if (!result[1])
      throw new Error('Todo does not exist.');
    return result[1][0].dataValues;
  }

  async remove(id: number) {
    const isDeleted = await this.todosRepository.destroy({ where: { id } });
    if (!isDeleted)
      throw new Error('Todo does not exist.');
    return isDeleted;
  }
}
