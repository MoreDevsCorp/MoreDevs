import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Query {
    getExperiences: GetExperiencesReturnType
  }

  type Mutation {
    addExperience(
      title: String!
      description: String!
      location: String!
      company: String!
      startDate: String!
      endDate: String!
      present: Boolean
    ): AddExperienceReturnType
  }

  type AddExperienceReturnType {
    success: Boolean
  }

  type GetExperiencesReturnType {
    experiences: [Experience]
  }

  type Experience {
    id: String
    title: String
    description: String
    location: String
    company: String
    startDate: Date
    endDate: Date
    present: Boolean
  }
`;

export default typeDefs;
