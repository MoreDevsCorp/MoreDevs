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

import { User } from "./types";

function App() {
  const [user, setUser] = useState<User | {}>();

  useEffect(() => {
    const user = localStorage.getItem("MOREDEVS_USER");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Welcome />} path="/" />
        <Route element={<LoginPage />} path="/auth/login" />
        <Route element={<RegisterPage />} path="/auth/register" />

        <Route element={<PrivateLayout />}>
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
