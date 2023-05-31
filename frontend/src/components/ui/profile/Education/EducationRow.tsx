import { FaUniversity } from "react-icons/fa";

export default function EducationRow() {
  return (
    <div className="flex space-x-6 w-full">
      <div>
        <FaUniversity size={40} className="text-black-900" />
      </div>

      <div className="flex flex-col space-y-3">
        <h2 className="text-xl font-semibold text-black-900">
          Ecole Fraincaise D'enseignement Technique
        </h2>

        <h6 className="text-md font-medium text-black-900">
          Technicien Specialisee
        </h6>

        <h6 className="text-md font-light text-black-900">2020 - Present</h6>

        <h6 className="text-md text-black-900">
          Additional English classes and UX profile courses.
        </h6>
      </div>
    </div>
  );
}
