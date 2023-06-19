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
import { useEffect, useState } from "react";

import Protected from "./lib/isLoggedIn";

import { User } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  // const [user, setUser] = useState<User | null>();

  const user = useSelector((state: RootState) => state.userLogin.userInfo);
  console.log(user);

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
          <Route element={<Profile />} path="/profile" />
          <Route element={<CompanyProfile />} path="/company" />
          <Route element={<CreateCompany />} path="/create-company" />
          {/* <Route element={<Home />} path="/private" /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
