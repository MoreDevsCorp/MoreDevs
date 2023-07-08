import { FC } from "react";
import Button from "../Button";
import Google from "../../../assets/companyLogo.png";
import { Link } from "react-router-dom";
import { Offer } from "../../../types";

interface JobCardProps {
  offer: Offer;
}

const JobCard = ({ offer }: JobCardProps) => {
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

        <div className="w-full space-y-8 flex-col items-start md:flex-row flex md:items-center justify-between md:space-x-28 py-4 px-2">
          <div>
            <h1 className="text-lg font-semibold">{offer.title}</h1>
            <div className="space-x-2">
              <span className="font-medium text-md">{offer.company.name}</span>

              <span className="text-xs">{offer.type.toUpperCase()}</span>
            </div>
            <p className="mt-2 text-sm">{offer.description}</p>
          </div>
          <div>
            <Button>
              <Link to={"/jobs/12312"}>More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
