import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    getFollowers: GetFollowersRerturnType
    getFollowing: GetFollowingRerturnType
  }

  type Mutation {
    follow(userId: String!): FollowReturnType
    deleteFollow(userId: String!): FollowReturnType
  }

  type FollowReturnType {
    success: Boolean
  }

  type GetFollowersRerturnType {
    followers: [Follower]
  }

  type GetFollowingRerturnType {
    following: [Following]
  }

  type Follower {
    id: String
    name: String
    image: String
  }

  type Following {
    id: String
    name: String
    image: String
  }
`;

export default typeDefs;
