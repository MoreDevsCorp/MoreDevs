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
  }

  type Author {
    id: String
    image: String
    name: String
    job_title: String
  }

  type Like {
    id: String
  }

  type Post {
    id: String
    author: Author
    content: String
    createdAt: Date
    likes: [Like]
    comments: Int
  }

  type GetPostsReturnType {
    posts: [Post]
  }

  type PostReturnType {
    success: Boolean
  }
`;

export default typeDefs;
