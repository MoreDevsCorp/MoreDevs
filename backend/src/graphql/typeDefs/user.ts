import gql from "graphql-tag";

const typeDefs = gql`
  type User {
    id: String
    username: String
  }

  type Query {
    searchUsers(username: String): [User]
  }

  type Mutation {
    createUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): UserReturnType

    setUpUser(
      bio: String
      skillIds: [String]
      interestsIds: [String]
    ): UserReturnType
  }

  type UserReturnType {
    success: Boolean
  }
`;

export default typeDefs;
