import { Link } from "react-router-dom";
import illu from "../../assets/undraw_monitor_iqpq.svg";

const NotFound = () => {
  return (
    <div className="flex space-y-6 flex-col items-center justify-center h-screen w-screen">
      <Link to={"/home"}>Go back to main page</Link>
      <h1 className="text-4xl font-bold tracking-tight">Oops!</h1>
      <h1 className="text-8xl font-bold tracking-tight">404</h1>
      <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
      <img src={illu} alt="404 page" className="max-w-[600px]" />
    </div>
  );
};

export default NotFound;
