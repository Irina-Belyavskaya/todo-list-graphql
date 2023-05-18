import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { TodoCreationAttrs } from "../types/creation-attributes.type";

@Table({tableName: 'todos'})
@ObjectType()
export class Todo extends Model<Todo, TodoCreationAttrs> {
  @Column({
    type: DataType.INTEGER, 
    unique: true, 
    autoIncrement: true, 
    primaryKey: true 
  })
  @Field(() => Int)
  id: number

  @Column
  @Field(() => String)
  text: string

  @Column
  @Field(() => Boolean)
  isDone: boolean
}
