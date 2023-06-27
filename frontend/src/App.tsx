import Welcome from "./pages/public/Welcome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import PrivateLayout from "./components/layout/private/Layout";
import Home from "./pages/private/Home";
import Profile from "./pages/private/Profile";
import CompanyProfile from "./pages/private/CompanyProfile";
import CreateCompany from "./components/ui/company/CreateCompany";
import Jobs from "./pages/private/Jobs";
import JobPage from "./components/ui/jobs/JobPage";
import CreateJobOffer from "./components/ui/jobs/CreateJobOffer";

import Protected from "./lib/isLoggedIn";

import { useSelector } from "react-redux";
import SkillsPage from "./components/ui/profile/Skills/SkillsPage";
import EducationPage from "./components/ui/profile/Education/EducationPage";
import { useLazyQuery } from "@apollo/client";

import userOperations from "./graphql/operations/user";
import { GetCompanyData, GetCompanyVariables, GetUserData } from "./types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import companyOperations from "./graphql/operations/company";
import ExperiencePage from "./components/ui/profile/Experiences/ExperiencePage";
import { selectUser, userLogin } from "./state/userSlice/userSlice";
import NotFound from "./pages/public/NotFound";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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
        onCompleted: (data) => {
          console.log(data);
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
          <Route element={<Home />} path="/home" />
          <Route element={<Jobs />} path="/jobs" />
          <Route element={<JobPage />} path="/jobs/:id" />
          <Route element={<CreateJobOffer />} path="/joboffer/create" />
          <Route element={<Profile />} path="/profile/:userId" />
          <Route
            element={<SkillsPage />}
            path="/profile/:userId/details/skills"
          />
          <Route
            element={<EducationPage />}
            path="/profile/:userId/details/education"
          />
          <Route
            element={<ExperiencePage />}
            path="/profile/:userId/details/experience"
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
