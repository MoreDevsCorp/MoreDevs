import { FavoriteBorder } from "@mui/icons-material";
import Favorite from "@mui/icons-material/Favorite";
import { Checkbox } from "@mui/material";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import user from "../../../assets/user.jpg";

export default function Comment() {
  return (
    <div className="my-3 mt-4">
      <div className="pplc">
        <img
          src={user}
          alt="profile image"
          width={40}
          height={40}
          className="rounded-full"
        />

        <div className="flex items-center space-x-1  ">
          <h2 className="text-md font-semibold">John Doe </h2>
          <p className="flex items-center space-x-1 text-sm text-gray-500">
            <AiOutlineClockCircle size={"12"} />
            <span>12 minutes ago</span>
          </p>
        </div>

        <p className="col-start-2">You know the deal my G.</p>

        <div className="flex items-center space-x-4 col-start-2">
          <div className="flex items-center">
            <Checkbox
              className="-ml-2"
              size="small"
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
            <h5 className="text-sm">12</h5>
          </div>

          <div className="flex items-center space-x-2 cursor-pointer">
            <FaRegCommentAlt size={"14"} />
            <h5 className="text-sm">Reply</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
