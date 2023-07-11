import React from "react";

import { useQuery } from "@apollo/client";

import postOperations from "../../graphql/operations/post";
import { GetPostsData, GetProfileVariables } from "../../types";
import { useParams } from "react-router-dom";
import Post from "../../components/ui/post";

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
        data?.getPosts.posts.map((ps, num) => {
          return (
            <div className="mb-8">
              <Post
                refetch={refetch}
                postId={ps.id}
                author={ps.author.name}
                content={ps.content}
                jobtitle={ps.author.job_title}
                createdAt={ps.createdAt}
                key={num}
              />
            </div>
          );
        })
      )}
    </div>
  );
};
export default Posts;
