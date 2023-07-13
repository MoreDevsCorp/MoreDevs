import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Query {
    getComments(postId: String!): GetCommentsReturnType
  }

  type Mutation {
    createComment(postId: String!, content: String!): CommentReturnType
    deleteComment(commentId: String): CommentReturnType
  }

  type Comment {
    id: String
    content: String
    author: CommentAuthor
    createdAt: Date
  }

  type CommentAuthor {
    id: String
    name: String
  }

  type GetCommentsReturnType {
    comments: [Comment]
  }

  type CommentReturnType {
    success: Boolean
  }
`;

export default typeDefs;
