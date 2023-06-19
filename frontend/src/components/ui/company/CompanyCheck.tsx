import { Link } from "react-router-dom";
import Button from "../Button";

const CompanyCheck = () => {
  return (
    <div className="flex flex-col mx-auto space-y-8 my-6 items-center">
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        Don't you have a Company? <br></br> Create It Now!
      </h1>
      <Link to={"/create-company"}>
        <Button>Create Company</Button>
      </Link>
    </div>
  );
};

export default CompanyCheck;
