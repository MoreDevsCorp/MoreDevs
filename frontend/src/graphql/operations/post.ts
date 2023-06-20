import { gql } from "@apollo/client";

const postOperations = {
  Queries: {
    getPosts: gql`
      query GetPosts {
        getPosts {
          posts {
            author {
              id
              name
              image
              createdAt
            }
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
