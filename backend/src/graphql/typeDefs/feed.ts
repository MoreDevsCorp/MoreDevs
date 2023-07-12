import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    getFeed: GetFeedReturnType
  }

  type GetFeedReturnType {
    feed: [Post]
  }
`;

export default typeDefs;
