import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateLayout from "./components/layout/private/Layout";
import CreateCompany from "./components/ui/company/CreateCompany";
import CreateJobOffer from "./components/ui/jobs/CreateJobOffer";
import JobPage from "./components/ui/jobs/JobPage";
import EducationPage from "./components/ui/profile/Education/EducationPage";
import ExperiencePage from "./components/ui/profile/Experiences/ExperiencePage";
import SkillsPage from "./components/ui/profile/Skills/SkillsPage";
import companyOperations from "./graphql/operations/company";
import userOperations from "./graphql/operations/user";
import Protected from "./lib/isLoggedIn";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import CompanyProfile from "./pages/private/CompanyProfile";
import Home from "./pages/private/Home";
import Jobs from "./pages/private/Jobs";
import Profile from "./pages/private/Profile";
import NotFound from "./pages/public/NotFound";
import Welcome from "./pages/public/Welcome";
import { selectUser, userLogin } from "./state/userSlice/userSlice";
import {
  GetCompanyData,
  GetCompanyVariables,
  GetFeedData,
  GetProfileData,
  GetProfileVariables,
  GetUserData,
} from "./types";

import AppliedJob from "./components/ui/jobs/AppliedJob";
import JobApplicants from "./components/ui/jobs/JobApplicants";
import ComingSoon from "./pages/private/ComingSoon";
import feedOperations from "./graphql/operations/feed";
import profileOperations from "./graphql/operations/profile";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [getProfile, { data: getProfileData, refetch: getProfileRefetch }] =
    useLazyQuery<GetProfileData, GetProfileVariables>(
      profileOperations.Queries.getProfile
    );

  const { data: feedData, refetch: feedRefetch } = useQuery<GetFeedData>(
    feedOperations.Queries.getFeed
  );

  const [getUser, { refetch: refetchUser }] = useLazyQuery<GetUserData>(
    userOperations.Queries.getUser
  );

  const [getCompany, { data: companyData, refetch: refetchCompany }] =
    useLazyQuery<GetCompanyData, GetCompanyVariables>(
      companyOperations.Queries.getCompany
    );

  const reload = () => {
    refetchUser();
    refetchCompany();
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  useEffect(() => {
    if (user) {
      getUser({
        onCompleted: (data) => {
          dispatch(userLogin(data.getUser.user));
        },
      });
    }
  }, []);

  useEffect(() => {
    if (user && user.companyCreated) {
      getCompany({
        variables: {
          id: user.company.id,
        },
      });
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Welcome />} path="/" />
        <Route element={<LoginPage />} path="/auth/login" />
        <Route element={<RegisterPage />} path="/auth/register" />

        <Route
          element={
            <Protected user={user}>
              <PrivateLayout />
            </Protected>
          }
        >
          {/* coming soon pages */}
          <Route element={<ComingSoon />} path="/messages" />
          <Route element={<ComingSoon />} path="/network" />
          <Route element={<ComingSoon />} path="/marketplace" />

          <Route
            element={
              <Home refetch={feedRefetch} feed={feedData?.getFeed.feed} />
            }
            path="/home"
          />
          <Route element={<Jobs />} path="/jobs" />
          <Route element={<JobPage />} path="/jobs/:id" />
          <Route element={<JobApplicants />} path="/job/applicants" />
          <Route element={<AppliedJob />} path="/profile/:userId/appliedjobs" />
          {user && user.companyCreated && (
            <Route element={<CreateJobOffer />} path="/joboffer/create" />
          )}
          <Route
            element={
              <Profile
                profile={getProfileData?.getProfile.profile}
                refetch={getProfileRefetch}
                getProfile={getProfile}
              />
            }
            path="/profile/:userId"
          />
          <Route
            element={<SkillsPage refetchProfile={getProfileRefetch} />}
            path="/profile/details/skills"
          />
          <Route
            element={<EducationPage refetchProfile={getProfileRefetch} />}
            path="/profile/details/education"
          />
          <Route
            element={<ExperiencePage refetchProfile={getProfileRefetch} />}
            path="/profile/details/experience"
          />
          <Route
            element={
              <CompanyProfile company={companyData?.getCompany.company} />
            }
            path="/company"
          />
          <Route element={<CompanyProfile />} path="/company/:id" />
          <Route
            element={<CreateCompany refetch={reload} />}
            path="/create-company"
          />
          {/* <Route element={<Home />} path="/private" /> */}
        </Route>
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
