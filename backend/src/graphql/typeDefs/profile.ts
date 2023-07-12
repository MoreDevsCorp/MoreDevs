import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Profile {
    id: String
    name: String
    location: String
    email: String
    image: String
    bio: String
    skills: [Skill]
    experiences: [Experience]
    educations: [Education]
    followers: [Followers]
    following: [Following]
    job_type: String
    job_title: String
    first_name: String
    last_name: String
    city: String
    isFollowed: Boolean
  }

  type Followers {
    id: String
    name: String
  }

  type Following {
    id: String
    name: String
  }

  type Query {
    getProfile(userId: String!): GetProfileReturnType
  }

  type GetProfileReturnType {
    profile: Profile
  }

  type Education {
    id: String
    startDate: Date
    endDate: Date
    location: String
  }

  type SetupProfileReturnType {
    success: Boolean
  }

  type Mutation {
    setUpProfile(
      id: String
      first_name: String
      last_name: String
      job_title: String
      job_type: String
      bio: String
      city: String
    ): SetupProfileReturnType
  }
`;

export default typeDefs;
