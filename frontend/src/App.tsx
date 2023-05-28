import Welcome from "./pages/Welcome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Welcome />} path="/" />
        <Route element={<LoginPage />} path="/auth/login" />
        <Route element={<RegisterPage />} path="/auth/register" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
