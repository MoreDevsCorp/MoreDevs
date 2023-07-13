import { gql } from "@apollo/client";

export default {
  Queries: {
    getComments: gql`
      query getComments($postId: String!) {
        getComments(postId: $postId) {
          comments {
            id
            content
            createdAt
            author {
              id
              name
            }
          }
        }
      }
    `,
  },

  Mutations: {
    createComment: gql`
      mutation CreateComment($postId: String!, $content: String!) {
        createComment(postId: $postId, content: $content) {
          success
        }
      }
    `,
  },
};
