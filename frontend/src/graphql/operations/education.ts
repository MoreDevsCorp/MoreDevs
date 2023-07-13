import { gql } from "@apollo/client";

export default {
  Queries: {
    getEducations: gql`
      query GetEducations {
        getEducations {
          educations {
            id
            title
            description
            startedAt
            endedAt
            level
            present
          }
        }
      }
    `,
  },
  Mutations: {
    addEducation: gql`
      mutation AddEducation(
        $title: String!
        $description: String!
        $level: String!
        $startedAt: String!
        $endedAt: String
        $present: Boolean!
      ) {
        addEducation(
          title: $title
          description: $description
          level: $level
          startedAt: $startedAt
          endedAt: $endedAt
          present: $present
        ) {
          success
        }
      }
    `,

    deleteEducation: gql`
      mutation DeleteEducation($educationId: String!) {
        deleteEducation(educationId: $educationId) {
          success
        }
      }
    `,
  },
};
