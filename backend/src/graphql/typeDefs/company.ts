import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Query {
    getCompany(id: String!): GetCompanyReturnType
  }

  type CompanyType {
    id: String
    name: String
    description: String
    location: String
    avatar: String
    website: String
    slogan: String
    offers: Offer
  }

  type GetCompanyReturnType {
    company: CompanyType
  }

  type Mutation {
    createCompany(
      name: String!
      slogan: String!
      description: String!
      location: String!
    ): CreateCompanyReturnType
  }

  type CreateCompanyReturnType {
    id: String
  }
`;

export default typeDefs;
