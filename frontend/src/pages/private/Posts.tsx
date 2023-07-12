import React from "react";

import { useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";
import Post from "../../components/ui/post";
import postOperations from "../../graphql/operations/post";
import { GetPostsData, GetProfileVariables } from "../../types";
import { useSelector } from "react-redux";
import { selectUser } from "../../state/userSlice/userSlice";

interface PostsProps {}

const Posts: React.FC<PostsProps> = () => {
  const { userId } = useParams();
  const user = useSelector(selectUser);

  const { data, error, loading, refetch } = useQuery<
    GetPostsData,
    GetProfileVariables
  >(postOperations.Queries.getPosts, {
    variables: {
      userId: userId || "",
    },
  });

  return (
    <div className="max-w-[600px]">
      <h1 className="my-3 font-semibold text-2xl text-black-900">Posts</h1>
      {data?.getPosts.posts.length == 0 ? (
        user.id == userId ? (
          <h3 className="italic text-gray-500">
            You have not shared any posts yet.
          </h3>
        ) : (
          <h3 className="italic text-gray-500">
            This user has not shared any posts yet.
          </h3>
        )
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
