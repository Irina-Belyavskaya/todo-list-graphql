import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String)
  text: string;

  @Field(() => Boolean)
  isDone: boolean;
}
