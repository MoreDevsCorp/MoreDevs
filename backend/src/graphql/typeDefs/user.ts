import gql from "graphql-tag";

const typeDefs = gql`
  type User {
    id: String
    username: String
    email: String
    image: String
    token: String
  }

  type Query {
    searchUsers(username: String): [User]
    loginUser(email: String, password: String): User
  }

  type Mutation {
    registerUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User

    setUpUser(bio: String, skillIds: [String], interestsIds: [String]): User
  }

  # type UserReturnType {
  #   user: User
  # }
`;

export default typeDefs;
