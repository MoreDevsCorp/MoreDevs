import { gql } from "@apollo/client";

export default {
  Queries: {
    getSkills: gql`
      query GetSkills($userId: String) {
        getSkills(userId: $userId) {
          skills {
            id
            name
          }
        }
      }
    `,
  },
};
