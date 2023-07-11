import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Query {
    getOffers(companyId: String): GetOffersReturnType
    getOffer(id: String!): GetOfferReturnType
  }

  type Mutation {
    createOffer(
      title: String!
      description: String!
      location: String!
      type: String!
      skillsIds: [String]!
      companyId: String!
    ): CreateOfferReturnType
    updateOffer(
      title: String
      description: String
      location: String
      type: String
      skillIds: [String]
      companyId: String
    ): CreateOfferReturnType
    deleteOffer: CreateOfferReturnType
  }

  type CreateOfferReturnType {
    success: Boolean
  }

  type Company {
    id: String
    name: String
    location: String
    avatar: String
  }

  type Skills {
    skill: Skill
  }

  type Offer {
    id: String
    title: String
    description: String
    taken: Boolean
    type: String
    company: Company
    createdAt: Date
    location: String
    skills: [Skills]
  }

  type GetOffersReturnType {
    offers: [Offer]
  }

  type GetOfferReturnType {
    offer: Offer
  }
`;

export default typeDefs;
