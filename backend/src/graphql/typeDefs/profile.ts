import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Profile {
    id: String
    name: String
    location: String
    image: String
    bio: String
    skills: [Skill]
    experiences: [Experience]
    educations: [Education]
    followers: Int
    following: Int
  }

  type Query {
    getProfile: GetProfileReturnType
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

  type Experience {
    id: String
    title: String
    description: String
    location: String
    company: Company
    startDate: Date
    endDate: Date
  }
`;

export default typeDefs;
