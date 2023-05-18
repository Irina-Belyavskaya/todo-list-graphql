import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      user {
        name
      }
      access_token,
      expired_at
    }
  }
`

export const SIGN_UP = gql`
  mutation signup($input: SignUpUserInput!) {
    signup(signupUserInput: $input) {
      user {
        email,
        name
      }
      access_token,
      expired_at
    }
  }
`

export const LOG_OUT = gql`
  {
    logOut 
  }
`