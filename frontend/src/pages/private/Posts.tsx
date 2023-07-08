import React from "react";

import { useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";
import postOperations from "../../graphql/operations/post";
import { GetPostsData, GetProfileVariables } from "../../types";

interface PostsProps {}

const Posts: React.FC<PostsProps> = () => {
  const { userId } = useParams();

  const { data } = useQuery<GetPostsData, GetProfileVariables>(
    postOperations.Queries.getPosts,
    {
      variables: {
        userId: userId || "",
      },
    }
  );
  console.log(data);

  return <div className="max-w-[600px]"></div>;
};
export default Posts;
