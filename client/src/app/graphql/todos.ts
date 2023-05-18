import { gql } from "@apollo/client";

export const GET_ALL_TODOS = gql`
  query getTodos {
    todos {
      id,
      text,
      isDone
    }
  }
`

export const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    removeTodo(id: $id)
  }
`

export const CREATE_TODO = gql`
  mutation createTodo($input: CreateTodoInput!) {
    createTodo(createTodoInput: $input) {
      id
    }
  }
`

export const UPDATE_TODO = gql`
  mutation updateTodo($input: UpdateTodoInput!) {
    updateTodo(updateTodoInput: $input) {
      id,
      text,
      isDone
    }
  }
`