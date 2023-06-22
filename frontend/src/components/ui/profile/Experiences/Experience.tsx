import { Experience as ExperienceType } from "../../../../types";
import ExperienceRow from "./ExperienceRow";

interface ExperienceProps {
  experiences: ExperienceType[] | undefined;
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <div className="p-6 space-y-4 border border-gray-100 rounded">
      <h1 className="font-semibold text-2xl text-black-900">Experience</h1>
      <div className="flex flex-wrap space-y-10 bg-white  py-6 ">
        {experiences?.map((exp) => {
          return <ExperienceRow key={exp.id} />;
        })}
      </div>
    </div>
  );
}
