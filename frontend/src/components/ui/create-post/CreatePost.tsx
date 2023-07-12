import TextareaAutosize from "@mui/base/TextareaAutosize";
import { HiOutlineEmojiHappy } from "react-icons/hi";

import { IoImageOutline } from "react-icons/io5";
// import profile from "../../../assets/profile.jpg";
import Button from "../Button";

import { useMutation } from "@apollo/client";
import postOperations from "../../../graphql/operations/post";
import { CreatePostData, CreatePostVariables } from "../../../types";
import { useState } from "react";

const CreatePost = () => {
  const [createPostMutation, {}] = useMutation<
    CreatePostData,
    CreatePostVariables
  >(postOperations.Mutations.createPost);

  const [text, setText] = useState("");

  return (
    <div className="py-5 px-3 border border-gray-100 bg-white w-[100%] rounded space-y-4">
      <div className="flex items-start space-x-4 ">
        <img
          src={"/images/img_avatar.jpeg"}
          alt="profile image"
          width={40}
          height={40}
          className="rounded-full"
        />
        <TextareaAutosize
          maxRows={5}
          minRows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-[100%] outline-none resize-none min-h-1 max-h-20 bg-gray-50 h-auto rounded placeholder-zinc-400 py-2 px-4 text-sm"
          aria-label="maximum height"
          placeholder="What's on your mind?"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-zinc-400 text-xl ">
          {/* <AiOutlineCamera className="cursor-pointer" /> */}
          <IoImageOutline className="cursor-pointer" />
          {/* <AiOutlinePaperClip className="cursor-pointer" />
          <IoLocationOutline className="cursor-pointer" /> */}
          <HiOutlineEmojiHappy className="cursor-pointer" />
        </div>
        <Button
          outline
          onClick={() => {
            createPostMutation({
              variables: {
                content: text,
              },
            });
          }}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
