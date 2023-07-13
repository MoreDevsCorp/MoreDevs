import React, { useEffect } from "react";
import Comment from "./Comment";

import {
  Comment as CommenType,
  GetCommentsData,
  GetCommentsVariables,
} from "../../../types";

type CommentsProps = {
  postId: string;
  getComments: (args: { variables: GetCommentsVariables }) => void;
  comments: CommenType[] | undefined;
};

const Comments: React.FC<CommentsProps> = ({
  postId,
  comments,
  getComments,
}) => {
  useEffect(() => {
    getComments({
      variables: {
        postId,
      },
    });
  }, []);
  return (
    <div>
      {comments?.length ? (
        comments?.map((comment) => {
          return <Comment comment={comment} key={comment.id} />;
        })
      ) : (
        <p className="opacity-50 text-md mt-2">
          No Comments on this post, be the first to comment !
        </p>
      )}
    </div>
  );
};
export default Comments;
