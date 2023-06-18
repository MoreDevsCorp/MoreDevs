import companyLogo from "../../assets/companyLogo.png";
import { GoPrimitiveDot } from "react-icons/go";
import Button from "../../components/ui/Button";
import MyTabs from "../../components/ui/Tabs";
import About from "../../components/ui/profile/About";
import Post from "../../components/ui/post";
import ProfileSettings from "../../components/ui/profile/Profile Setting/ProfileSettings";
import RecentJobs from "../../components/ui/company/RecentJobs";
import CompanyCheck from "../../components/ui/company/CompanyCheck";
import { Link } from "react-router-dom";
import JobList from "../../components/ui/jobs/JobList";

const bgImage = null;
const companyCreated = true;

const CompanyProfile = () => {
  return !companyCreated ? (
    <CompanyCheck />
  ) : (
    <div className="w-full space-y-6 max-w-[1100px] mb-20">
      <div className="rounded  w-full  border border-gray-100">
        <div className="w-full h-[200px]">
          {bgImage ? (
            <img src={bgImage} alt="bg image" />
          ) : (
            <div className="w-full rounded-t  h-full bg-gradient-to-tr from-yellow-200 to-pink-200">
              {" "}
            </div>
          )}
        </div>

        <div className="flex justify-between items-start">
          <div className="-mt-[90px] p-5 ">
            <div className="bg-white  inline-block rounded-full">
              <img
                src={companyLogo}
                alt="profile image"
                className="w-[160px] h-[160px] rounded-full m-1"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <h1 className="font-semibold text-2xl text-black-900">Google</h1>
              <p className="text-black-600">🚩 Agadir, Morocco</p>
              <div className="block space-x-1 items-center sm:flex">
                <h4>@Google</h4>
                <GoPrimitiveDot className="hidden sm:block text-black-600" />
                <h4 className="font-medium">Best IT company in the world.</h4>
              </div>
            </div>

            <div className="flex space-x-2 items-center mt-4">
              <Button type="button">Message</Button>
            </div>
          </div>

          <div className="mt-6 mr-4">
            {companyCreated ? (
              <Button type="button">
                <span className="flex space-x-1 items-center text-white ">
                  <Link to="/joboffer/create">
                    <span>Create Job Offer</span>
                  </Link>
                </span>
              </Button>
            ) : (
              <Button type="button">
                <span className="flex space-x-1 items-center text-white ">
                  <span>Follow +</span>
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <MyTabs
        tabsArr={["Profile", "Jobs List", "Settings"]}
        c1={
          <div className={"space-y-6"}>
            <About />
            <RecentJobs />
          </div>
        }
        c2={
          <div>
            <JobList />
          </div>
        }
        c3={<ProfileSettings />}
      />
    </div>
  );
};

export default CompanyProfile;
