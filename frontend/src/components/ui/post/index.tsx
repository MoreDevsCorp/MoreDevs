import { AiOutlineShareAlt, AiOutlineClockCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import user from "../../../assets/user.jpg";
import profile from "../../../assets/profile.jpg";
import mydesk from "../../../assets/mydesk.png";
import Comment from "./Comment";
import { Checkbox } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";
import Favorite from "@mui/icons-material/Favorite";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function Post() {
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
              John Doe{" "}
              <span className="text-sm  font-normal">Software Developer</span>
            </h2>
            <p className="flex items-center space-x-1 text-sm text-gray-500">
              <AiOutlineClockCircle /> <span>12 minutes ago</span>
            </p>
          </div>
        </div>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>

      {/* post description */}
      <p className="my-3">
        Things just ain't the same for gangsters, becoming OG's in the game
        changer, best friends and money I lost'em both.
      </p>
      {/* image place */}
      <img
        src={mydesk}
        alt="post image"
        className="h-[20%] rounded   w-[100%]"
      />
      {/* like comment share */}
      <div className="flex items-center justify-between my-1 pb-2 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Checkbox
              className="-ml-2 z-[5]"
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
            <h5>12</h5>
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
