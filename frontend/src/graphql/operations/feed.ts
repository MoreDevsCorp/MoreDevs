import { gql } from "@apollo/client";

export default {
  Queries: {
    getFeed: gql`
      query GetFeed {
        getFeed {
          feed {
            id
            author {
              id
              name
              image
              job_title
            }
            comments {
              id
            }
            createdAt
            content
            likes {
              id
              userId
            }
            isLiked
          }
        }
      }
    `,
  },
};
