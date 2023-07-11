import { Link } from "react-router-dom";
import pp from "../../../assets/profile.jpg";
import Button from "../Button";
import { useQuery } from "@apollo/client";
import offer from "../../../graphql/operations/offer";
import {
  Applicant,
  GetApplicantsData,
  GetApplicantsVariables,
} from "../../../types";

const JobApplicants = () => {
  const params = new URLSearchParams(window.location.search);
  const offerId = params.get("offerId");
  const { data } = useQuery<GetApplicantsData, GetApplicantsVariables>(
    offer.Queries.getApplicants,
    {
      variables: {
        offerId: offerId || "",
      },
    }
  );

  return (
    <div className="w-full">
      <h1 className="font-semibold text-2xl text-black-900">Job Applicants</h1>
      <h1 className="mt-5 font-medium text-md text-black-900">
        Job: UX Designer
      </h1>
      <div className="max-w-[800px] space-y-5">
        {data?.getApplicants.applicants.map((applicant) => {
          return <JobApplicantsCard key={applicant.id} applicant={applicant} />;
        })}
      </div>
    </div>
  );
};

interface JobApplicantsCardProps {
  applicant: Applicant;
}

const JobApplicantsCard = ({ applicant }: JobApplicantsCardProps) => {
  return (
    <div className="py-4 px-2 border-b-2 border-gray-100">
      <div className="flex space-x-2 items-center">
        <div className="">
          <img
            src={pp}
            alt="user"
            width={50}
            height={50}
            className="rounded-full min-w-[60px]"
          />
        </div>

        <div className="w-full space-y-8 flex-col items-start md:flex-row flex md:items-center justify-between md:space-x-28 py-4 px-2">
          <div>
            <h1 className="text-lg font-semibold">{applicant.name}</h1>
            <div className="space-x-2">
              <span className="font-medium text-md">{applicant.job_title}</span>
            </div>
          </div>
          <div>
            <Button>
              <Link to={`/profile/${applicant.id}`}>Visit Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobApplicants;
