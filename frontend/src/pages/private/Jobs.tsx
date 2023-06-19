import JobCard from "../../components/ui/jobs/JobCard";

const Jobs: React.FC = () => {
  return (
    <div className=" w-full p-2 ">
      <div className="max-w-[800px] space-y-5">
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </div>
  );
};

export default Jobs;
