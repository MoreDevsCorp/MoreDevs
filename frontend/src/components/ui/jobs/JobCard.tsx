import { FC } from "react";
import Button from "../Button";
import Google from "../../../assets/companyLogo.png";

const JobCard: FC = () => {
  return (
    <div className="py-4 px-2 border-b-2 border-gray-100">
      <div className="flex space-x-2">
        <div className="">
          {" "}
          <img
            src={Google}
            alt="company logo"
            width={150}
            height={150}
            className="rounded-full min-w-[60px]"
          />
        </div>

        <div className="space-y-8 flex-col items-start md:flex-row flex md:items-center justify-between md:space-x-28 py-4 px-2">
          <div>
            <h1 className="text-md font-semibold">UX/UI designer</h1>
            <div className="space-x-2">
              <span className="font-medium text-sm">Upwork</span>

              <span className="text-xs">Remote only</span>
            </div>
            <p className="mt-2 text-sm">
              On Upwork you'll find a range of top freelancers and agencies,
              from developers and development agencies to designers and creative
              agencies, copywriters,
            </p>
          </div>
          <div>
            <Button>More</Button>
            <h3>Internship</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
