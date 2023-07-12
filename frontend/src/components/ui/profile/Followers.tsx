import { Link } from "react-router-dom";
import pp from "../../../assets/profile.jpg";
import Button from "../Button";
import { useQuery } from "@apollo/client";
import offer from "../../../graphql/operations/offer";

import follow from "../../../graphql/operations/follow";

const Followers = () => {
  const params = new URLSearchParams(window.location.search);

  // const { data } = useQuery<getFollowersData>(follow.Queries.getFollowers);
  // console.log(data);

  return (
    <div className="w-full">
      <h1 className="font-semibold text-2xl text-black-900">Followers</h1>

      {/* <div className="max-w-[800px] space-y-5">
        {data?.getApplicants.applicants.map((fl) => {
          return <FollowerCard key={fl.id} applicant={fl} />;
        })}
      </div> */}
    </div>
  );
};

const FollowerCard = ({ applicant }: any) => {
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
export default Followers;