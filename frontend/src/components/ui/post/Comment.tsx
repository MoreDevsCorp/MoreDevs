import { AiOutlineClockCircle } from "react-icons/ai";

import { Comment as CommentType } from "../../../types";
import { getDifferenceInDays } from "../../../lib/utils";

interface CommentProps {
  comment: CommentType | undefined;
}

export default function Comment({ comment }: CommentProps) {
  console.log(comment?.createdAt);

  const daysPassed = comment && getDifferenceInDays(comment.createdAt);

  return (
    <div className="my-3 mt-4">
      <div className="pplc">
        <img
          src={"/images/img_avatar.jpeg"}
          alt="profile image"
          width={40}
          height={40}
          className="rounded-full"
        />

        <div className="flex items-center space-x-1  ">
          <h2 className="text-md font-semibold">{comment?.author.name} </h2>
          <p className="flex items-center space-x-1 text-sm text-gray-500">
            <AiOutlineClockCircle size={"12"} />
            <span>{daysPassed}</span>
          </p>
        </div>

        <p className="col-start-2">{comment?.content}</p>

        <div className="flex items-center space-x-4 col-start-2">
          {/* <div className="flex items-center">
            <Checkbox
              className="-ml-2"
              size="small"
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
            <h5 className="text-sm">12</h5>
          </div> */}

          {/* <div className="flex items-center space-x-2 cursor-pointer">
            <FaRegCommentAlt size={"14"} />
            <h5 className="text-sm">Reply</h5>
          </div> */}
        </div>
      </div>
    </div>
  );
}
