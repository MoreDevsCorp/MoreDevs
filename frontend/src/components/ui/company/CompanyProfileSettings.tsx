import TextareaAutosize from "@mui/base/TextareaAutosize";

// import profile from "../../../../assets/profile.jpg";
import Button from "../Button";
import { useSelector } from "react-redux";

import { useMutation } from "@apollo/client";
import {
  Company,
  SetUpProfileData,
  SetUpProfileVariables,
} from "../../../types";
import profileOperations from "../../../graphql/operations/profile";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { selectUser } from "../../../state/userSlice/userSlice";

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

interface CompanyProfileSettingsProps {
  company: Company | undefined;
  refetch: () => void;
}

export default function CompanyProfileSettings({
  company,
  refetch,
}: CompanyProfileSettingsProps) {
  // const { userId } = useParams();
  const user = useSelector(selectUser);

  const [formData, setFormData] = useState({
    company_name: company?.name || "",
    slogan: company?.slogan || "",
    description: company?.description || "",
    location: company?.location || "",
    website: company?.website || "",
  });

  const [bio, setBio] = useState<string>(company?.description || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [setUpProfile, { data, loading, error }] = useMutation<
    SetUpProfileData,
    SetUpProfileVariables
  >(profileOperations.Mutations.setUpProfile);

  const handleSubmit = async () => {
    // setUpProfile({
    //   variables: {
    //     id: user.id,
    //     first_name: formData?.first_name,
    //     last_name: formData?.last_name,
    //     bio: bio,
    //     job_title: formData.job_title,
    //     job_type: formData.job_type,
    //     city: formData.city,
    //   },
    //   onCompleted: (data) => {
    //     if (data.setUpProfile.success) {
    //       refetch();
    //       toast.success("Informastion updated successfully!");
    //     }
    //   },
    //   onError(error) {
    //     toast.error("Failed to update informations !");
    //     console.log(error.message);
    //   },
    // });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-full border border-gray-100 rounded p-6">
      <div className="mb-8 text-right">
        <Button size="text-xs">Update Company Informations</Button>
      </div>

      <div className="gridCol2 items-center  content-center  gap-6 ">
        <h6 className="font-medium">Company Logo</h6>
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

        <h6 className="font-medium">Company Name</h6>
        <Input
          placeholder="Company Name"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
        />

        <h6 className="font-medium">Slogan</h6>
        <Input
          placeholder="Slogan"
          name="slogan"
          value={formData.slogan}
          onChange={handleChange}
        />
        <h6 className="font-medium">Location</h6>
        <Input
          placeholder="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <h6 className="font-medium">Description</h6>
        <TextareaAutosize
          value={bio}
          name="bio"
          onChange={(e) => setBio(e.target.value)}
          maxRows={5}
          minRows={2}
          className="w-[100%]  border-2  outline-none resize-none min-h-1 max-h-20 bg-gray-50 h-auto rounded placeholder-black-600 py-2 px-2 text-sm font-medium"
          placeholder="Write a short description about your company"
        />

        <h6 className="font-medium">Website</h6>
        <Input
          placeholder="www.example.com"
          name="website"
          value={formData.website}
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
