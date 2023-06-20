import { gql } from "@apollo/client";

export default {
  Queries: {},
  Mutations: {
    createOffer: gql`
      mutation CreateOffer(
        $companyId: String!
        $title: String!
        $description: String!
        $location: String!
        $skillsIds: [String]!
      ) {
        createOffer(
          companyId: $companyId
          title: $title
          description: $description
          location: $location
          skillsIds: $skillsIds
        ) {
          success
        }
      }
    `,
  },
};
