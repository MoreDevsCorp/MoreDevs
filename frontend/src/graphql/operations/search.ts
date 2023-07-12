import { gql } from "@apollo/client";

const searchOperations = {
  Queries: {
    getQueryData: gql`
      query GetQueryData($searchQuery: String!) {
        getQueryData(searchQuery: $searchQuery) {
          profile {
            id
            name
          }
        }
      }
    `,
  },
};

export default searchOperations;
