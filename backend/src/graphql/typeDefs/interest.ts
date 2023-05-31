import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    getInterests: GetInterestsReturnType
  }

  type GetInterestsReturnType {
    interests: [Interest]
  }

  type Interest {
    id: String
    name: String
  }
`;

export default typeDefs;
