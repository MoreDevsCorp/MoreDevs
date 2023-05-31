import { gql } from "@apollo/client";

export default {
  Queries: {},
  Mutations: {
    createUser: gql`
      mutation createUser(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
      ) {
        createUser(
          firstName: $firstName
          lastName: $lastName
          email: $email
          password: $password
        ) {
          id
          username
          email
          token
        }
      }
    `,

    loginUser: gql`
      mutation loginUser($password: String!) {
        loginUser(
          firstName: $firstName
          lastName: $lastName
          email: $email
          password: $password
        ) {
          id
          username
          email
          token
        }
      }
    `,

    setupProfile: gql`
      mutation setupProfile(
        $bio: String
        $description: String
        $skillIds: [String]
        $tags: [String]
      ) {
        setupProfile(
          bio: $bio
          description: $description
          skillIds: $skillIds
          tags: $tags
        ) {
          id
          username
          email
          token
        }
      }
    `,
  },
  Subscriptions: {},
};
