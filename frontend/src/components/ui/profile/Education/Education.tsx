import EducationRow from "./EducationRow";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Education() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4 border border-gray-100 rounded">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl text-black-900">Education</h1>
        <PencilIcon
          onClick={() => navigate("details/education")}
          className="hover:opacity-50 cursor-pointer h-5 w-5"
        />
      </div>

      <div className="flex flex-wrap space-y-10 bg-white  py-6 ">
        <EducationRow />
        <EducationRow />
        <EducationRow />
      </div>
    </div>
  );
}
