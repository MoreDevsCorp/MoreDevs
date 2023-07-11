import { gql } from "@apollo/client";

export default {
  Queries: {
    getSkills: gql`
      query GetSkills($userId: String) {
        getSkills(userId: $userId) {
          skills {
            id
            name
            slug
          }
        }
      }
    `,
  },
  Mutation: {
    addSkill: gql`
      mutation AddSkill($name: String!) {
        addSkill(name: $name) {
          success
        }
      }
    `,
  },
};
