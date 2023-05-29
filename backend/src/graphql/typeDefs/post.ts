import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Query {
    getPosts: GetPostsReturnType
  }

  type Mutation {
    createPost(content: String): PostReturnType
    updatePost(postId: String, content: String): PostReturnType
    deletePost(postId: String): PostReturnType
  }

  type Post {
    content: String
    createdAt: Date
    likesCount: Int
  }

  type GetPostsReturnType {
    posts: [Post]
  }

  type PostReturnType {
    success: Boolean
  }
`;

export default typeDefs;
