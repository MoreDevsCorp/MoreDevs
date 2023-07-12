import { GoPrimitiveDot } from "react-icons/go";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import companyLogo from "../../assets/companyLogo.png";
import Button from "../../components/ui/Button";
import MyTabs from "../../components/ui/Tabs";
import CompanyCheck from "../../components/ui/company/CompanyCheck";
import RecentJobs from "../../components/ui/company/RecentJobs";
import JobList from "../../components/ui/jobs/JobList";
import About from "../../components/ui/profile/About";

import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import CompanyProfileSettings from "../../components/ui/company/CompanyProfileSettings";
import companyOperations from "../../graphql/operations/company";
import { selectUser } from "../../state/userSlice/userSlice";
import { Company, GetCompanyData, GetCompanyVariables } from "../../types";

const bgImage = null;

interface CompanyProfileProps {
  company?: Company | null;
}

const CompanyProfile = ({ company }: CompanyProfileProps) => {
  const user = useSelector(selectUser);
  // const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const companyId = params.get("companyId");
  const navigate = useNavigate();

  const [getCompany, { data, refetch }] = useLazyQuery<
    GetCompanyData,
    GetCompanyVariables
  >(companyOperations.Queries.getCompany);

  if (!user.companyCreated && !companyId) {
    return <CompanyCheck />;
  }

  useEffect(() => {
    if (companyId) {
      if (user.companyCreated && companyId === user.company.id) {
        navigate("/company");
      }
      getCompany({
        variables: {
          id: companyId,
        },
      });
    } else {
      getCompany({
        variables: {
          id: user?.company.id,
        },
      });
    }
  }, [companyId]);

  return (
    <div className="w-full space-y-6 max-w-[1100px] mb-20">
      <div className="rounded  w-full  border border-gray-100">
        <div className="w-full h-[200px]">
          {bgImage ? (
            <img src={bgImage} alt="bg image" />
          ) : (
            <div className="w-full rounded-t  h-full bg-gradient-to-tr from-yellow-200 to-pink-200"></div>
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
              <h1 className="font-semibold text-2xl text-black-900">
                {data?.getCompany.company
                  ? data?.getCompany.company.name
                  : company?.name}
              </h1>
              <p className="text-black-600">
                🚩{" "}
                {data?.getCompany.company
                  ? data.getCompany.company.location
                  : company?.location}
                , Morocco
              </p>
              <div className="block space-x-1 items-center sm:flex">
                <GoPrimitiveDot className="hidden sm:block text-black-600" />
                <h4 className="font-medium">
                  {data?.getCompany.company
                    ? data.getCompany.company.slogan
                    : company?.slogan}
                </h4>
              </div>
              <div className="block space-x-1 items-center sm:flex">
                <a
                  className="font-medium text-blue-900"
                  href={`http://${company?.website}`}
                  target="_blank"
                >
                  {data?.getCompany.company
                    ? data?.getCompany.company.website
                    : company?.website}
                </a>
              </div>
            </div>

            {companyId && (
              <div className="flex space-x-2 items-center mt-4">
                <Button type="button">Message</Button>
              </div>
            )}
          </div>

          <div className="mt-6 mr-4">
            {user?.companyCreated && !companyId ? (
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
        tabsArr={
<<<<<<< HEAD
          user.companyCreated && user.company.id === companyId
=======
          user?.company?.id == data?.getCompany.company.id
>>>>>>> dde0bec34e9b700449487c8f255dac3a5f153884
            ? ["Profile", "Jobs List", "Settings"]
            : ["Profile"]
        }
        c1={
          <div className={"space-y-6"}>
            <About
              content={
                data?.getCompany?.company
                  ? data.getCompany.company.description
                  : company?.description
              }
            />
            <RecentJobs />
          </div>
        }
        c2={
          <div>
            <JobList />
          </div>
        }
        c3={
          <CompanyProfileSettings
            company={data?.getCompany.company}
            refetch={refetch}
          />
        }
      />
    </div>
  );
};

export default CompanyProfile;
