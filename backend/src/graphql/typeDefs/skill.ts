import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    getSkills(userId: String): GetSkillsReturnType
  }

  type GetSkillsReturnType {
    skills: [Skill]
  }

  type Skill {
    id: String
    name: String
  }
`;

export default typeDefs;
