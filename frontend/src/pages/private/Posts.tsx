import React from "react";
import Post from "../../components/ui/post";
import { useQuery } from "@apollo/client";

import postOperations from "../../graphql/operations/post";
import { GetPostsData, GetProfileVariables } from "../../types";
import { useParams } from "react-router-dom";

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
