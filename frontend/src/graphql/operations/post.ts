import { gql } from "@apollo/client";

const postOperations = {
  Queries: {
    getPosts: gql`
      query GetPosts($userId: String!) {
        getPosts(userId: $userId) {
          posts {
            id
            author {
              id
              name
              image
              job_title
            }
            createdAt
            content
            likes {
              id
              userId
            }
            isLiked
          }
        }
      }
    `,
  },
  Mutations: {
    like: gql`
      mutation Like($postId: String!) {
        like(postId: $postId) {
          success
        }
      }
    `,
    dislike: gql`
      mutation Dislike($postId: String!) {
        dislike(postId: $postId) {
          success
        }
      }
    `,
    createPost: gql`
      mutation CreatePost($content: String!) {
        createPost(content: $content) {
          success
        }
      }
    `,
    updatePost: gql`
      mutation UpdatePost($content: String!, $postId: String!) {
        updatePost(content: $content, postId: $postId) {
          success
        }
      }
    `,
    deletePost: gql`
      mutation DeletePost($postId: String!) {
        deletePost(postId: $postId) {
          success
        }
      }
    `,
  },
};

export default postOperations;

// old version

// getPosts: gql`
//       query GetPosts($userId: String!) {
//         getPosts(userId: $userId) {
//           posts {
//             author {
//               id
//               name
//               image
//               job_title
//             }
//             createdAt
//             comments
//             likes {
//               id
//             }
//           }
//         }
//       }
//     `,
