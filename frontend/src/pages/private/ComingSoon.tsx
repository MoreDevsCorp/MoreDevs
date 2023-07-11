import { Link } from "react-router-dom";
import illu from "../../assets/coningsoonilu.svg";

const ComingSoon = () => {
  return (
    <div className="flex space-y-6 flex-col items-center justify-center w-full ">
      <Link to={"/home"}>Go back to main page</Link>

      <h1 className="text-4xl font-bold tracking-tight">Coming Soon!</h1>
      <img src={illu} alt="404 page" className="max-w-[600px]" />
    </div>
  );
};

export default ComingSoon;
