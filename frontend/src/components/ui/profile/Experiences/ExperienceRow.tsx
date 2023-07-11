import { MdOutlineWorkOutline } from "react-icons/md";
import { Experience } from "../../../../types";
import { useEffect, useState } from "react";

interface ExperienceRowProps {
  experience: Experience;
}

export default function ExperienceRow({ experience }: ExperienceRowProps) {
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    setDates({
      startDate: new Date(experience.startDate.replace(" ", "T")),
      endDate: new Date(),
    });
  }, [experience]);

  return (
    <div className="flex space-x-6 w-full">
      <div>
        <MdOutlineWorkOutline size={40} className="text-black-900" />
      </div>
      <div className="flex flex-col space-y-3">
        <h2 className="text-xl font-semibold text-black-900">
          {experience?.title}
        </h2>
        {/* 
        <h6 className="text-md font-medium text-black-900">
          {experience?.company.name}
        </h6> */}

        <h6 className="text-md font-light text-black-900">
          {dates.startDate.getFullYear()} -{" "}
          {experience?.present ? "Present" : dates.endDate.getFullYear()}
        </h6>

        <h6 className="text-md text-black-900">{experience?.description}</h6>
      </div>
    </div>
  );
}
