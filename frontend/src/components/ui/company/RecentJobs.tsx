import { Link } from "react-router-dom";
import companyLogo from "../../../assets/companyLogo.png";
import Button from "../Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { useQuery } from "@apollo/client";
import { GetOffersData } from "../../../types";
import offer from "../../../graphql/operations/offer";
import { selectUser } from "../../../state/userSlice/userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

interface JobProps {
  jobTitle: string;
  jobManner: string;
  url: string;
}
export const Job = ({ jobTitle, jobManner, url }: JobProps) => {
  return (
    <Card className="min-w-[240px]">
      <CardHeader>
        <CardTitle>
          <img width={60} src={companyLogo} alt="logo" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-md font-medium">{jobTitle}</p>
        <p className="text-sm">{jobManner}</p>
      </CardContent>
      <CardFooter>
        <Link to={`/jobs/${url}`}>
          <Button outline size="text-sm">
            Check Job
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
const RecentJobs = () => {
  const user = useSelector(selectUser);
  const params = new URLSearchParams(window.location.search);
  const companyId = params.get("companyId");

  const { data, refetch } = useQuery<GetOffersData>(offer.Queries.getOffers, {
    variables: {
      companyId: companyId || user.company.id,
    },
  });

  useEffect(() => {
    refetch();
  }, []);
  return (
    <div className=" p-6 space-y-4 border border-gray-100 rounded">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl text-black-900">Recent Jobs</h1>
        {/* <Button outline>See All Jobs</Button> */}
      </div>
      <div className="flex justify-start flex-wrap gap-4 py-6 ">
        {data?.getOffers.offers.length == 0
          ? "No jobs has been posted yet"
          : data?.getOffers.offers.slice(0, 3).map((db) => {
              return (
                <Job jobTitle={db.title} jobManner={db.type} url={db.id} />
              );
            })}
      </div>
    </div>
  );
};

export default RecentJobs;
