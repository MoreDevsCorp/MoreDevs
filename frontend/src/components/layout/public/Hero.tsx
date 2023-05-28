import Button from "../../ui/Button";

const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-10 py-xxl">
      <h1 className="font-extrabold slogan ">
        The Home Of <br /> <span className="text-[#FF2400]">Moroccan</span>{" "}
        Developers
      </h1>
      <p className="md:px-[250px] text-zinc-500">
        Build your network and connect with people in the software development
        community.
      </p>
      <div className="w-[160px]">
        <Button>Discover More !</Button>
      </div>
    </div>
  );
};

export default HeroSection;
