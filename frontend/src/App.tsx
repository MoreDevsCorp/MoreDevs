import Welcome from "./pages/public/Welcome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import PrivateLayout from "./components/layout/private/Layout";
import Home from "./pages/private/Home";
import Profile from "./pages/private/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Welcome />} path="/" />
        <Route element={<LoginPage />} path="/auth/login" />
        <Route element={<RegisterPage />} path="/auth/register" />
        <Route element={<PrivateLayout />}>
          <Route element={<Home />} path="/home" />
          <Route element={<Profile />} path="/profile" />
          {/* <Route element={<Home />} path="/private" /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
