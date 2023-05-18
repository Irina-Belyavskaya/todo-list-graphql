import { Sequelize } from 'sequelize-typescript'
import { Todo } from 'src/todos/entities/todo.entity'
import { User } from 'src/users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'todo-list',
      });
      sequelize.addModels([Todo, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];