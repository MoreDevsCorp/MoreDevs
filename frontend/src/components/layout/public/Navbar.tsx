import { Link } from "react-router-dom";
import Button from "../../ui/Button";

const Links = ["Home", "About Us", "Company", "Freelancing"];

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full ">
      <div className="flex justify-between items-center space-x-20">
        <h1 className="text-3xl font-extrabold ">MoreDevs.</h1>
        <ul className="flex space-x-5 items-center">
          {Links.map((link) => (
            <li className="text-gray-500 hover:text-gray-900" key={link}>
              <Link to={link.trim().toLowerCase()}>{link}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center space-x-2">
        <Link to="/auth/login">
          <Button outline>Login</Button>
        </Link>
        <div className="h-20" />
        <Link to="/auth/register">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
