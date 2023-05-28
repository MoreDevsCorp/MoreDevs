import HeroSection from "../components/layout/public/Hero";
import Navbar from "../components/layout/public/Navbar";

const Welcome: React.FC = () => {
  return (
    <div className="px-20 w-full h-screen ">
      <Navbar />
      <HeroSection />
    </div>
  );
};
export default Welcome;
