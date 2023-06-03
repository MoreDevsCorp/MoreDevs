import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import companyLogo from "../../../assets/companyLogo.png";
import Button from "../Button";
import { Link } from "react-router-dom";

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
        <p className="text-md">{jobTitle}</p>
        <p className="text-sm">{jobManner}</p>
      </CardContent>
      <CardFooter>
        <Link to={url}>
          <Button size="text-sm">Check Job</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
const RecentJobs = () => {
  return (
    <div className=" p-6 space-y-4 border border-gray-100 rounded">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl text-black-900">Recent Jobs</h1>
        <Button outline>See All Jobs</Button>
      </div>
      <div className="flex justify-around flex-wrap gap-4">
        <Job
          jobTitle="UX/UI designer"
          jobManner="Remote Only"
          url="/job?id=12321"
        />
        <Job
          jobTitle="Front End Developer"
          jobManner="Office"
          url="/job?id=12321"
        />
        <Job
          jobTitle="UX/UI designer"
          jobManner="Optional"
          url="/job?id=12321"
        />
      </div>
    </div>
  );
};

export default RecentJobs;
