import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Query {
    getEducations: GetEducationsReturnType
  }

  type Mutation {
    addEducation(
      title: String!
      description: String!
      level: String!
      startedAt: Date!
      endedAt: Date
      present: Boolean
    ): AddEducationReturnType

    deleteEducation(educationId: String!): AddEducationReturnType
  }

  type AddEducationReturnType {
    success: Boolean
  }

  type GetEducationsReturnType {
    educations: [Education]
  }

  type Education {
    id: String
    title: String
    description: String
    level: String
    startedAt: Date!
    endedAt: Date
    present: Boolean
  }
`;

export default typeDefs;
