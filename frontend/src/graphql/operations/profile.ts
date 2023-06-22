import { gql } from "@apollo/client";

const profileOperations = {
  Queries: {
    getProfile: gql`
      query GetProfile($userId: String!) {
        getProfile(userId: $userId) {
          profile {
            bio
            educations {
              endDate
              id
              location
              startDate
            }
            experiences {
              id
              description
              startDate
              endDate
              title
            }
            following
            followers
            id
            image
            location
            name
            skills {
              id
              name
            }
          }
        }
      }
    `,
  },
  Mutations: {},
};

export default profileOperations;
