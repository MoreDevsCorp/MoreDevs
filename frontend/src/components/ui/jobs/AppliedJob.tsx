import offerOperations from "../../../graphql/operations/offer";
import { useQuery } from "@apollo/client";
import { GetOffersData } from "../../../types";
import JobCard from "./JobCard";

const AppliedJob = () => {
  const { data } = useQuery<GetOffersData>(offerOperations.Queries.getOffers);
  return (
    <div>
      <h1 className="font-semibold text-2xl text-black-900">
        Jobs You Applied To
      </h1>
      <div className="max-w-[800px] space-y-5">
        {data?.getOffers.offers.map((offer) => {
          return <JobCard key={offer.id} offer={offer} />;
        })}
      </div>
    </div>
  );
};

export default AppliedJob;
