import React from "react";

import { useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";
import Post from "../../components/ui/post";
import postOperations from "../../graphql/operations/post";
import { GetPostsData, GetProfileVariables } from "../../types";

interface PostsProps {}

const Posts: React.FC<PostsProps> = () => {
  const { userId } = useParams();

  const { data, error, loading, refetch } = useQuery<
    GetPostsData,
    GetProfileVariables
  >(postOperations.Queries.getPosts, {
    variables: {
      userId: userId || "",
    },
  });
  console.log(data, error);

  return (
    <div className="max-w-[600px]">
      {loading ? (
        <h1>Loading..</h1>
      ) : (
        data?.getPosts.posts.map((ps) => {
          return (
            <div className="mb-8" key={ps.id}>
              <Post post={ps} refetch={refetch} key={ps.id} />
            </div>
          );
        })
      )}
    </div>
  );
};
export default Posts;
