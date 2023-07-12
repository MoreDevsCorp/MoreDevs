import { useMutation } from "@apollo/client";
import { Menu } from "@headlessui/react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { FavoriteBorder } from "@mui/icons-material";
import Favorite from "@mui/icons-material/Favorite";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { AiOutlineClockCircle, AiOutlineShareAlt } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import mydesk from "../../../assets/mydesk.png";
import profile from "../../../assets/profile.jpg";
import postOperations from "../../../graphql/operations/post";
import { getDifferenceInDays } from "../../../lib/utils";
import {
  CreatePostData,
  DeletePostVariables,
  LikeData,
  LikeVariables,
  Post as PostType,
  UpdatePostVariables,
} from "../../../types";
import Button from "../Button";
import Comment from "./Comment";
import { toast } from "react-hot-toast";
import user from "../../../assets/avatar.webp";

interface PostProps {
  post: PostType;
  refetch: () => void;
}
interface DropDownProps {
  SetIsPostEdit: (value: boolean) => void;
  postId: string;
  refetch: () => void;
}
export function DropDown({ SetIsPostEdit, postId, refetch }: DropDownProps) {
  const [deletePostMutation, { error }] = useMutation<
    CreatePostData,
    DeletePostVariables
  >(postOperations.Mutations.deletePost);
  console.log(error);

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className="inline-flex w-full justify-center ">
            <BsThreeDotsVertical className="cursor-pointer" />
          </Menu.Button>
        </div>
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y  divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    SetIsPostEdit(true);
                  }}
                  className={`${
                    active ? "bg-black-900 text-white" : "text-black-600"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-gray-500`}
                >
                  Edit
                </button>
              )}
            </Menu.Item>
            <hr />

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    deletePostMutation({
                      variables: {
                        postId: postId,
                      },
                      onCompleted: () => {
                        toast.success("Post has been deleted!");
                        refetch();
                      },
                    });
                  }}
                  className={`${
                    active ? "bg-black-900 text-white" : "text-black-600"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-gray-500`}
                >
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default function Post({ post, refetch }: PostProps) {
  console.log(post.id);
  const [isPostEdit, SetIsPostEdit] = useState(false);
  const [textContent, setTextContent] = useState(post.content);
  const [updatePostMutation, { error }] = useMutation<
    CreatePostData,
    UpdatePostVariables
  >(postOperations.Mutations.updatePost);

  const [like, { data: likeData }] = useMutation<LikeData, LikeVariables>(
    postOperations.Mutations.like
  );
  const [dislike, { data: dislikeData }] = useMutation<LikeData, LikeVariables>(
    postOperations.Mutations.dislike
  );

  const daysPassed = post && getDifferenceInDays(post.createdAt);

  return (
    <div className="p-4 border border-gray-100 bg-white rounded ">
      {/* first row */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <div>
            <img
              src={user}
              alt="profile image"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div>
            <h2 className="text-md font-semibold">
              {post.author.name ? post.author.name : "John Doe"}{" "}
              <span className="text-sm  font-normal">
                {post.author.job_title || "Software Developer"}
              </span>
            </h2>
            <p className="flex items-center space-x-1 text-sm text-gray-500">
              <AiOutlineClockCircle /> <span>{daysPassed}</span>
            </p>
          </div>
        </div>

        <DropDown
          SetIsPostEdit={SetIsPostEdit}
          postId={post.id}
          refetch={refetch}
        />
      </div>

      {/* post description */}
      {isPostEdit ? (
        <div className="my-4">
          <TextareaAutosize
            maxRows={5}
            minRows={2}
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            className="w-[100%] outline-none resize-none min-h-1 max-h-20 bg-gray-50 h-auto rounded placeholder-zinc-400 py-2 px-4 "
            aria-label="maximum height"
            placeholder="What's on your mind?"
          />
          <Button
            size="text-xs"
            outline
            onClick={() => {
              updatePostMutation({
                variables: {
                  content: textContent,
                  postId: post.id,
                },
                onCompleted: () => {
                  toast.success("Post has been updated!");
                  refetch();
                },
              });
              SetIsPostEdit(false);
              console.log(error);
            }}
          >
            Update
          </Button>
        </div>
      ) : (
        <p className="my-3">
          {post.content ||
            "Things just ain't the same for gangsters, becoming OG's in the game changer, best friends and money I lost'em both."}
        </p>
      )}

      {/* image place */}
      {/* {post.postImg && (
        <img
          src={mydesk}
          alt="post image"
          className="h-[20%] rounded   w-[100%]"
        />
      )} */}
      {/* like comment share */}
      <div className="flex items-center justify-between my-1 pb-2 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Checkbox
              className="-ml-2 z-[5]"
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
              checked={post.isLiked}
              onChange={(e) => {
                if (!e.currentTarget.checked) {
                  dislike({
                    variables: { postId: post.id },
                    onCompleted: (data) => {
                      refetch();
                    },
                    onError: (error) => {
                      console.log(error.message);
                    },
                  });
                } else {
                  like({
                    variables: {
                      postId: post.id,
                    },
                    onCompleted: (data) => {
                      refetch();
                    },
                    onError: (error) => {
                      console.log(error.message);
                    },
                  });
                }
              }}
            />
            <h5>{post.likes.length}</h5>
          </div>

          <div className="flex items-center space-x-2 cursor-pointer">
            <FaRegCommentAlt />
            <h5>Comment</h5>
          </div>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <AiOutlineShareAlt />
          <h5>Share</h5>
        </div>
      </div>

      {/* add comment for the person logged in */}
      <div className="flex items-center space-x-4 mt-2">
        <img
          src={profile}
          alt="profile image"
          width={40}
          height={40}
          className="rounded-full"
        />
        <TextareaAutosize
          maxRows={5}
          className="w-[100%] outline-none resize-none min-h-1 max-h-20 bg-gray-50 h-auto rounded placeholder-zinc-400 py-2 px-4 text-sm"
          aria-label="maximum height"
          placeholder="What's on your mind?"
        />
      </div>

      <Comment />
    </div>
  );
}
