import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Query {
    getOffers(companyId: String): GetOffersReturnType
    getOffer(id: String!): GetOfferReturnType
    getApplicants(offerId: String!): GetApplicantsReturnType
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
    deleteOffer(offerId: String!): CreateOfferReturnType

    apply(offerId: String!): ApplyReturnType
  }

  type CreateOfferReturnType {
    success: Boolean
  }

  type GetApplicantsReturnType {
    applicants: [Applicant]
  }

  type Applicant {
    id: String
    name: String
    email: String
    job_title: String
    image: String
    location: String
    experiences: [MiniExperience]
  }

  type MiniExperience {
    title: String
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

  type ApplyReturnType {
    success: Boolean
  }
`;

export default typeDefs;
