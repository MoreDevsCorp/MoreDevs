import ExperienceRow from "./ExperienceRow";

export default function Experience() {
  return (
    <div className="p-6 space-y-4 border border-gray-100 rounded">
      <h1 className="font-semibold text-2xl text-black-900">Experience</h1>
      <div className="flex flex-wrap space-y-10 bg-white  py-6 ">
        <ExperienceRow />
        <ExperienceRow />
        <ExperienceRow />
      </div>
    </div>
  );
}
