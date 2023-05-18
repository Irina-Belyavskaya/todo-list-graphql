import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString({message: "must be a string"})
  @Field()
  name: string;

  @IsString({message: "must be a string"})
  @IsEmail({}, {message: "got incorrect email"})
  @Field()
  email: string;

  @IsString({message: "must be a string"})
  @Length(4, 16, {message: "range: 4-16 symbols"})
  @Field()
  password: string;
}
