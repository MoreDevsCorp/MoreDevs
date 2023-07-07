import EducationRow from "./EducationRow";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { Education as EducationType } from "../../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { selectUser } from "../../../../state/userSlice/userSlice";

interface EducationProps {
  educations: EducationType[] | undefined;
}

export default function Education({ educations }: EducationProps) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const user = useSelector(selectUser);

  return (
    <div className="p-6 space-y-4 border border-gray-100 rounded">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl text-black-900">Education</h1>
        {userId === user.id && (
          <PencilIcon
            onClick={() => navigate("details/education")}
            className="hover:opacity-50 cursor-pointer h-5 w-5"
          />
        )}
      </div>

      <div className="flex flex-wrap space-y-10 bg-white  py-6 ">
        {educations?.length == 0 ? (
          user.id == userId ? (
            <h3 className="italic text-gray-500">
              Add your educations to improve your profile.
            </h3>
          ) : (
            <h3 className="italic text-gray-500">
              This User has not added his educations yet.
            </h3>
          )
        ) : (
          educations?.map((edc) => {
            return <EducationRow key={edc.id} />;
          })
        )}
        {}
      </div>
    </div>
  );
}
