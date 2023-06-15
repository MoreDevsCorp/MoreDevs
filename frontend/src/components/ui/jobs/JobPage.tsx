import { FC } from "react";
import Button from "../Button";
import Google from "../../../assets/companyLogo.png";
import {
  MapPinIcon,
  BriefcaseIcon,
  ListBulletIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const JobPage: FC = () => {
  return (
    <div className="space-y-2 px-2 py-4">
      <h1 className="text-2xl font-semibold tracking-tight">UX/UI Designer</h1>

      <div>
        <img
          src={Google}
          alt="company"
          width={150}
          height={150}
          className="rounded-full min-w-[150px]"
        />
      </div>

      <h1 className="text-xl font-medium py-4">Google</h1>

      <div className="flex space-x-2">
        <ClockIcon className="h-5 w-5" />{" "}
        <span className="text-md font-medium">1 week ago</span>
      </div>

      <div className="flex space-x-2">
        <MapPinIcon className="h-5 w-5" />{" "}
        <span className="text-md font-medium">Agadir</span>
      </div>

      <div className="flex space-x-2">
        <BriefcaseIcon className="h-5 w-5" />{" "}
        <span className="text-md font-medium">Internship</span>
      </div>

      <div className="flex space-x-2">
        <ListBulletIcon className="h5 w-5" />{" "}
        <span className="text-md font-medium">Skills</span>
      </div>

      <ul className="ml-10 list-disc">
        <li>Web Design</li>
        <li>CSS</li>
        <li>PHP</li>
        <li>Web Developement</li>
      </ul>

      <h1 className="pt-5 text-xl tracking-tight font-medium">
        Job Description
      </h1>
      <p className="text-sm pb-3">
        Location: Agadir <br /> SCHEDULE: Part-time <br /> Are you a good
        developer wants to learn how to code, and how things work behind the
        scenes, well you're in the wrong place, we will use to make projects and
        never give you a cent, and put the pressure on you, and never let have
        free time, and forget you have something called weekend, we will turn
        your life into a hell. Please kindly apply to the job if you're ready
        for circumstances.
      </p>

      <Button>Apply</Button>
    </div>
  );
};

export default JobPage;
