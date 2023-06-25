import TextareaAutosize from "@mui/base/TextareaAutosize";

// import profile from "../../../../assets/profile.jpg";
import Button from "../../Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  Profile,
  SetUpProfileData,
  SetUpProfileVariables,
} from "../../../../types";
import profileOperations from "../../../../graphql/operations/profile";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Input {
  placeholder: string;
  prefix?: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, prefix, value, onChange, name }: Input) => {
  return (
    <>
      <div className="flex items-center border-2 rounded bg-gray-50 ">
        {prefix && (
          <p className="text-black-600 py-1.5  border-r-2 px-2">moreDevs.ma/</p>
        )}

        <input
          name={name}
          onChange={onChange}
          type="text"
          value={value}
          placeholder={placeholder}
          className={` ${
            !prefix && "py-1.5 "
          } px-2 w-[100%] bg-gray-50 text-sm placeholder-black-600 rounded  outline-none font-medium `}
        />
      </div>
    </>
  );
};

interface ProfileSettingsProps {
  profile: Profile | undefined;
  refetch: () => void;
}

export default function ProfileSettings({
  profile,
  refetch,
}: ProfileSettingsProps) {
  // const { userId } = useParams();
  const user = useSelector((state: RootState) => state.userLogin.userInfo);

  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    job_title: profile?.job_title || "",
    job_type: profile?.job_type || "",
    city: profile?.city || "",
    email: profile?.email || "",
  });

  const [bio, setBio] = useState<string>(profile?.bio || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [setUpProfile, { data, loading, error }] = useMutation<
    SetUpProfileData,
    SetUpProfileVariables
  >(profileOperations.Mutations.setUpProfile);

  const handleSubmit = async () => {
    setUpProfile({
      variables: {
        id: user.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        bio: bio,
        job_title: formData.job_title,
        job_type: formData.job_type,
        city: formData.city,
      },
      onCompleted: (data) => {
        if (data.setUpProfile.success) {
          refetch();
          toast.success("Informastion updated successfully!");
        }
      },
      onError(error) {
        toast.error("Failed to update informations !");
        console.log(error.message);
      },
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

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
              src={user.image ? user.image : "/images/img_avatar.png"}
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
          </div>
        </div>

        <h6 className="font-medium">First Name</h6>
        <Input
          placeholder="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />

        <h6 className="font-medium">Last Name</h6>
        <Input
          placeholder="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <h6 className="font-medium">Email</h6>
        <Input
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <h6 className="font-medium">Bio</h6>
        <TextareaAutosize
          value={bio}
          name="bio"
          onChange={(e) => setBio(e.target.value)}
          maxRows={5}
          minRows={2}
          className="w-[100%]  border-2  outline-none resize-none min-h-1 max-h-20 bg-gray-50 h-auto rounded placeholder-black-600 py-2 px-2 text-sm font-medium"
          placeholder="Write a short introduction"
        />

        <h6 className="font-medium">Job Title</h6>
        <Input
          placeholder="Job Title"
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
        />
        <h6 className="font-medium">Job Type</h6>
        <Input
          placeholder="Job Type"
          name="job_type"
          value={formData.job_type}
          onChange={handleChange}
        />

        <h6 className="font-medium">City</h6>
        <Input
          placeholder="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div className="flex mt-6 justify-end">
        <Button size="text-xs" onClick={handleSubmit}>
          Update
        </Button>
      </div>
    </div>
  );
}
