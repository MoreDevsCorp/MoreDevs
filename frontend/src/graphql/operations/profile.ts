import { gql } from "@apollo/client";

const profileOperations = {
  Queries: {
    getProfile: gql`
      query GetProfile($userId: String!) {
        getProfile(userId: $userId) {
          profile {
            first_name
            last_name
            city
            bio
            educations {
              endDate
              id
              location
              startDate
            }
            experiences {
              id
              description
              startDate
              endDate
              title
            }
            following
            followers
            id
            image
            location
            name
            job_type
            job_title
            skills {
              id
              name
            }
          }
        }
      }
    `,
  },
  Mutations: {
    setUpProfile: gql`
      mutation SetUpProfile(
        $id: String
        $first_name: String
        $last_name: String
        $job_title: String
        $job_type: String
        $bio: String
        $city: String
      ) {
        setUpProfile(
          id: $id
          first_name: $first_name
          last_name: $last_name
          job_title: $job_title
          job_type: $job_type
          bio: $bio
          city: $city
        ) {
          success
        }
      }
    `,
  },
};

export default profileOperations;
