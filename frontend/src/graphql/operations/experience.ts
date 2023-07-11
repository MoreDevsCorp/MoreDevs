import { gql } from "@apollo/client";

export default {
  Queries: {
    getExperiences: gql`
      query GetExperiences {
        getExperiences {
          experiences {
            id
            title
            description
            startDate
            endDate
            location
            present
            company {
              id
              name
              location
              avatar
            }
          }
        }
      }
    `,
  },
  Mutations: {},
};
