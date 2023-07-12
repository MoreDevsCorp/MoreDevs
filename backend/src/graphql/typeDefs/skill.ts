import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    getSkills(userId: String): GetSkillsReturnType
  }

  type GetSkillsReturnType {
    skills: [Skill]
  }

  type Mutation {
    addSkill(name: String!): AddSkillReturnType
    deleteSkill(skillId: String!): AddSkillReturnType
  }

  type AddSkillReturnType {
    success: Boolean
  }

  type Skill {
    id: String
    name: String
    slug: String
  }
`;

export default typeDefs;
