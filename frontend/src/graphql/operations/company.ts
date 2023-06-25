import { gql } from "@apollo/client";

export default {
  Queries: {
    getCompany: gql`
      query GetCompany($id: String!) {
        getCompany(id: $id) {
          company {
            id
            name
            description
            location
            avatar
            website
            slogan
            offers {
              id
              title
              createdAt
            }
          }
        }
      }
    `,
  },
  Mutations: {
    createCompany: gql`
      mutation CreateCompany(
        $name: String!
        $description: String!
        $location: String!
        $slogan: String!
      ) {
        createCompany(
          name: $name
          description: $description
          location: $location
          slogan: $slogan
        ) {
          id
        }
      }
    `,
  },
};
