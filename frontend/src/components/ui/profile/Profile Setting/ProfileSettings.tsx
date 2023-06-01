import TextareaAutosize from "@mui/base/TextareaAutosize";

import profile from "../../../../assets/profile.jpg";
import Button from "../../Button";

interface Input {
  placeholder: string;
  prefix?: string;
}

const Input = ({ placeholder, prefix }: Input) => {
  return (
    <>
      <div className="flex items-center border-2 rounded bg-gray-50 ">
        {prefix && (
          <p className="text-black-600 py-1.5  border-r-2 px-2">moreDevs.ma/</p>
        )}

        <input
          type="text"
          placeholder={placeholder}
          className={` ${
            !prefix && "py-1.5 "
          } px-2 w-[100%] bg-gray-50 text-sm placeholder-black-600 rounded  outline-none font-medium `}
        />
      </div>
    </>
  );
};

export default function ProfileSettings() {
  return (
    <div className="w-full border border-gray-100 rounded p-6">
      <div className="mb-8 text-right">
        <Button size="text-xs">Update Personal Informations</Button>
      </div>

      <div className="gridCol2 items-center  content-center  gap-6 ">
        <h6 className="font-medium">Your Photo</h6>
        <div className="flex justify-between w-full">
          <div className="px-4">
            <img
              src={profile}
              alt="profile image"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>

          <div className="flex items-center space-x-3">
            <Button outline size="text-xs">
              Delete
            </Button>

            <Button size="text-xs">Update</Button>
          </div>
        </div>

        <h6 className="font-medium">Username</h6>
        <Input prefix="moreDevs.ma/" placeholder="Username" />

        <h6 className="font-medium">First Name</h6>
        <Input placeholder="First Name" />

        <h6 className="font-medium">Last Name</h6>
        <Input placeholder="Last Name" />

        <h6 className="font-medium">Bio</h6>
        <TextareaAutosize
          maxRows={5}
          minRows={2}
          className="w-[100%]  border-2  outline-none resize-none min-h-1 max-h-20 bg-gray-50 h-auto rounded placeholder-black-600 py-2 px-2 text-sm font-medium"
          placeholder="Write a short introduction"
        />

        <h6 className="font-medium">Job Title</h6>
        <Input placeholder="Job Title" />

        <h6 className="font-medium">City</h6>
        <Input placeholder="City" />

        <h6 className="font-medium">Country</h6>
        <Input placeholder="Morocco" />
      </div>
    </div>
  );
}
