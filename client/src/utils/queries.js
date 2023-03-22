import { gql } from '@apollo/client';

export const GET_ME = gql`
query GetMe {
    getMe {
      _id
      username
      email
      password
      bookCount
      savedBooks
    }
  }
`