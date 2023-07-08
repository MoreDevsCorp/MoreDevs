import { FC } from "react";
import Button from "../Button";
import Google from "../../../assets/companyLogo.png";
import {
  MapPinIcon,
  BriefcaseIcon,
  ListBulletIcon,
  ClockIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@apollo/client";
import offerOperations from "../../../graphql/operations/offer";
import { GetOfferData, GetOfferVariables } from "../../../types";
import { useParams } from "react-router-dom";

import { getDifferenceInDays } from "../../../lib/utils";

const JobPage: FC = () => {
  const { id } = useParams();

  const { data } = useQuery<GetOfferData, GetOfferVariables>(
    offerOperations.Queries.getOffer,
    {
      variables: {
        id: id || "",
      },
    }
  );

  console.log(data?.getOffer.offer);

  const daysPassed = data && getDifferenceInDays(data.getOffer.offer.createdAt);

  return (
    <div className="space-y-2 px-2 py-4">
      <div className="flex space-x-2 py-2">
        <CheckIcon className="h-5 w-5" />
        <span className="text-md font-medium">
          Job Status: {data?.getOffer.offer.taken ? "Taken" : "Not Taken"}
        </span>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight">
        {data?.getOffer.offer.title}
      </h1>

      <div>
        <img
          src={Google}
          alt="company"
          width={150}
          height={150}
          className="rounded-full min-w-[150px]"
        />
      </div>

      <h1 className="text-xl font-medium py-4">
        {data?.getOffer.offer.company.name}
      </h1>

      <div className="flex space-x-2 items-center">
        <ClockIcon className="h-5 w-5" />{" "}
        {daysPassed && (
          <span className="text-md font-medium">{daysPassed}</span>
        )}
      </div>

      <div className="flex space-x-2 items-center">
        <MapPinIcon className="h-5 w-5" />{" "}
        <span className="text-md font-medium">
          {data?.getOffer.offer.location}
        </span>
      </div>

      <div className="flex space-x-2 items-center">
        <BriefcaseIcon className="h-5 w-5" />{" "}
        <span className="text-md font-medium">
          {data?.getOffer.offer.type.toUpperCase()}
        </span>
      </div>

      <div className="flex space-x-2 items-center">
        <ListBulletIcon className="h5 w-5" />{" "}
        <span className="text-md font-medium">Skills</span>
      </div>

      <ul className="ml-10 list-disc">
        {data?.getOffer.offer.skills.map((skill) => {
          return <li key={skill.skill.id}>{skill.skill.name}</li>;
        })}
      </ul>

      <h1 className="pt-5 text-xl tracking-tight font-medium">
        Job Description
      </h1>
      <p className="text-sm pb-3">
        Location: {data?.getOffer.offer.location} <br /> SCHEDULE:{" "}
        {data?.getOffer.offer.type.toUpperCase()} <br />{" "}
        {data?.getOffer.offer.description}
      </p>

      <Button>Apply</Button>
    </div>
  );
};

export default JobPage;
