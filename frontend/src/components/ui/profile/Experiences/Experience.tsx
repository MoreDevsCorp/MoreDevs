import { useNavigate, useParams } from "react-router-dom";
import { Experience as ExperienceType } from "../../../../types";
import ExperienceRow from "./ExperienceRow";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { PencilIcon } from "@heroicons/react/24/outline";
import { selectUser } from "../../../../state/userSlice/userSlice";

interface ExperienceProps {
  experiences: ExperienceType[] | undefined;
}

export default function Experience({ experiences }: ExperienceProps) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const user = useSelector(selectUser);
  return (
    <div className="p-6 space-y-4 border border-gray-100 rounded">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl text-black-900">Experience</h1>
        {userId === user.id && (
          <PencilIcon
            onClick={() => navigate("details/experience")}
            className="hover:opacity-50 cursor-pointer h-5 w-5"
          />
        )}
      </div>

      <div className="flex flex-wrap space-y-10 bg-white  py-6 ">
        {experiences?.map((exp) => {
          return <ExperienceRow key={exp.id} />;
        })}
      </div>
    </div>
  );
}
