import { CreateTodoInput } from './create-todo.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  isDone: boolean;
}
