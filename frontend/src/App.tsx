import Welcome from "./pages/Welcome";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Welcome />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
