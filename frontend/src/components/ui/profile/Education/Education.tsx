import EducationRow from "./EducationRow";

export default function Education() {
  return (
    <div className="p-6 space-y-4 border border-gray-100 rounded">
      <h1 className="font-semibold text-2xl text-black-900">Education</h1>
      <div className="flex flex-wrap space-y-10 bg-white  py-6 ">
        <EducationRow />
        <EducationRow />
        <EducationRow />
      </div>
    </div>
  );
}
