import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
      bookCount
      savedBooks
    }
  }
}
`

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`

export const SAVE_BOOK = gql`
mutation SaveBook($body: String!) {
  saveBook(body: $body) {
    _id
    authors
    description
    bookId
    image
    link
    title
  }
}
`

export const DELETE_BOOK = gql`
mutation DeleteBook($bookId: String!) {
  deleteBook(bookId: $bookId) {
    _id
    authors
    description
    bookId
    image
    link
    title
  }
}
`