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

    updateCompany(
      companyId: String
      name: String
      slogan: String
      location: String
      description: String
      website: String
    ): UpdateCompanyReturnType
  }

  type UpdateCompanyReturnType {
    success: Boolean
  }

  type CreateCompanyReturnType {
    id: String
  }
`;

export default typeDefs;
