import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserCreationAttrs } from '../types/creation-attributes.type';

@Table({tableName: 'users'})
@ObjectType()
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER, 
    unique: true, 
    autoIncrement: true, 
    primaryKey: true 
  })
  @Field(() => Int)
  id: string

  @Column
  @Field()
  name: string

  @Column
  @Field()
  email: string

  @Column
  @Field()
  password: string
}
