import { gql } from "@apollo/client";

export default {
  Queries: {
    getSkills: gql`
      query GetSkills {
        getSkills {
          skills {
            id
            name
          }
        }
      }
    `,
  },
};
