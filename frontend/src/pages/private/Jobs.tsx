import { useQuery } from "@apollo/client";
import JobCard from "../../components/ui/jobs/JobCard";

import offerOperations from "../../graphql/operations/offer";
import { GetOffersData } from "../../types";

const Jobs: React.FC = () => {
  const { data } = useQuery<GetOffersData>(offerOperations.Queries.getOffers);

  console.log(data);

  return (
    <div className=" w-full p-2 ">
      <div className="max-w-[800px] space-y-5">
        {data?.getOffers.offers.length == 0 ? (
          <h1 className="italic text-gray-800 w-full text-center">
            Currently No Jobs, Come Back Later.
          </h1>
        ) : (
          data?.getOffers.offers.map((offer) => {
            return <JobCard key={offer.id} offer={offer} />;
          })
        )}
      </div>
    </div>
  );
};

export default Jobs;
