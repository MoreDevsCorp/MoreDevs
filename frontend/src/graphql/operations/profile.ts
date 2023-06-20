import { gql } from "@apollo/client";

const profileOperations = {
  Queries: {
    getProfile: gql`
      query GetProfile($userId: String!) {
        getProfile(userId: $userId) {
          profile {
            id
            title
            description
            location
            company {
              id
              name
              location
              avatar
            }
            startDate
            endDate
          }
        }
      }
    `,
  },
  Mutations: {},
};

export default profileOperations;
