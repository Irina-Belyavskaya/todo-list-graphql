import { Todo } from "./entities/todo.entity";

export const todosProviders = [
  {
    provide: 'TODOS_REPOSITORY',
    useValue: Todo,
  },
]