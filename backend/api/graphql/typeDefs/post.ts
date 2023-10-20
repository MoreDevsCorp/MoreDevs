import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Query {
    getPosts(userId: String): GetPostsReturnType
  }

  type Mutation {
    createPost(content: String): PostReturnType
    updatePost(postId: String!, content: String!): PostReturnType
    deletePost(postId: String): PostReturnType
    like(postId: String!): PostReturnType
    dislike(postId: String!): PostReturnType
  }

  type Author {
    id: String
    image: String
    name: String
    job_title: String
  }

  type Like {
    id: String
    userId: String
  }

  type Post {
    id: String
    author: Author
    content: String
    createdAt: Date
    likes: [Like]
    comments: [MiniComment]
    isLiked: Boolean
  }

  type MiniComment {
    id: String
  }

  type GetPostsReturnType {
    posts: [Post]
  }

  type PostReturnType {
    success: Boolean
  }
`;

export default typeDefs;
