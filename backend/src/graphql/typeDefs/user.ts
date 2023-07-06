import gql from "graphql-tag";

const typeDefs = gql`
  type MiniCompany {
    id: String
  }

  type User {
    id: String
    name: String
    email: String
    image: String
    token: String
    companyCreated: Boolean
    company: MiniCompany
  }

  type GetUserReturnType {
    user: User
  }

  type Query {
    getUser: GetUserReturnType
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
