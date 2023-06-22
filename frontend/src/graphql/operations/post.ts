import { gql } from "@apollo/client";

const postOperations = {
  Queries: {
    getPosts: gql`
      query GetPosts($userId: String!) {
        getPosts(userId: $userId) {
          posts {
            author {
              id
              name
              image
              job_title
            }
            createdAt
            comments
            likes {
              id
            }
          }
        }
      }
    `,
  },
  Mutations: {
    createPost: gql`
        mutation CreatePost{
            createPost($content : String!){
                    createPost(content : $content){
                        success
                    }
            }
        }
    `,
  },
};

export default postOperations;
