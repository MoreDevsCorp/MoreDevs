import { gql } from "@apollo/client";

export default {
  Queries: {},
  Mutation: {
    follow: gql`
      mutation Follow($userId: String!) {
        follow(userId: $userId) {
          success
        }
      }
    `,
    deletFollow: gql`
      mutation DeleteFollow($userId: String!) {
        deleteFollow(userId: $userId) {
          success
        }
      }
    `,
  },
};
