import { FaUniversity } from "react-icons/fa";
import { Education } from "../../../../types";
import { useEffect, useState } from "react";

interface EducationRowProps {
  education: Education;
}

export default function EducationRow({ education }: EducationRowProps) {
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  console.log(education);

  useEffect(() => {
    setDates({
      startDate: new Date(education?.startedAt?.replace(" ", "T")),
      endDate: new Date(education?.endedAt?.replace(" ", "T")),
    });
  }, [education]);

  return (
    <div className="flex space-x-6 w-full">
      <div>
        <FaUniversity size={40} className="text-black-900" />
      </div>

      <div className="flex flex-col space-y-3">
        <h2 className="text-xl font-semibold text-black-900">
          {education.title}
        </h2>

        <h6 className="text-md font-medium text-black-900">
          {education.level}
        </h6>

        <h6 className="text-md font-light text-black-900">
          {dates.startDate.getFullYear() + "-" + dates.startDate.getMonth()} |{" "}
          {education?.present
            ? "Present"
            : dates.endDate.getFullYear() + "-" + dates.endDate.getMonth()}
        </h6>

        <h6 className="text-md text-black-900">{education.description}</h6>
      </div>
    </div>
  );
}
