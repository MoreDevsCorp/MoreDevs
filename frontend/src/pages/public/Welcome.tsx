import HeroSection from "../../components/layout/public/Hero";
import Navbar from "../../components/layout/public/Navbar";
import { selectUser } from "../../state/userSlice/userSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const user = useSelector(selectUser);

  return user ? (
    <Navigate to="/home" replace />
  ) : (
    <div className="px-20 w-full h-screen ">
      <Navbar />
      <HeroSection />
    </div>
  );
};
export default Welcome;
