import { faBell, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";

import { Menu } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser, userLogout } from "../../../state/userSlice/userSlice";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import TooltipComponent from "../../ui/Tooltip";

interface NavBar {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (value: boolean) => void;
}

export function DropDown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className="inline-flex w-full justify-center ">
            <img
              src={user.image ? user.image : "/images/img_avatar.jpeg"}
              alt="profile image"
              width={40}
              height={40}
              className="rounded-full min-w-[40px]"
            />
          </Menu.Button>
        </div>
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y  divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => navigate(`/profile/${user.id}`)}
                  className={`${
                    active ? "bg-black-900 text-white" : "text-black-600"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-gray-500`}
                >
                  Profile
                </button>
              )}
            </Menu.Item>
            <hr />
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-black-900 text-white" : "text-black-600"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-gray-500`}
                >
                  Profile Settings
                </button>
              )}
            </Menu.Item>
            <hr />
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    dispatch(userLogout());
                    window.location.reload();
                  }}
                  className={`${
                    active ? "bg-black-900 text-white" : "text-black-600"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-gray-500`}
                >
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
const NavBar = ({ isSideBarOpen, setIsSideBarOpen }: NavBar) => {
  const user = useSelector(selectUser);
  return (
    <nav className="z-50 px-10 py-4  w-[100%] border  border-gray-100 bg-white flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span
          className="lg:hidden text-xl cursor-pointer"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        >
          {isSideBarOpen ? <RxHamburgerMenu /> : <AiOutlineClose />}
        </span>
      </div>

      <div className="mx-4 md:ml-0 relative flex items-center  transition-all group">
        <MagnifyingGlassIcon className="group-hover:rotate-[360deg] absolute ml-2 h-5 w-5 text-gray-500 transition-all duration-500" />

        <input
          type="text"
          placeholder="Search in MoreDevs."
          className={`pl-10 pr-3  py-2 w-[0%] md:w-[100%] text-sm bg-gray-50 placeholder-gray-500 rounded border outline-none group-hover:w-[100%] transition-all duration-500`}
        />
      </div>

      <div className="flex items-center space-x-3">
        <TooltipComponent
          children={
            <Link to={`/profile/${user.id}/appliedjobs`}>
              <BriefcaseIcon
                className="w-10 h-10 bg-gray-50 border border-gray-100 p-2 rounded-full "
                strokeWidth={1.5}
              />
            </Link>
          }
        />

        <FontAwesomeIcon
          icon={faCommentDots}
          className="bg-gray-50 border border-gray-100 p-2 rounded-full text-xl"
        />

        <FontAwesomeIcon
          icon={faBell}
          className="bg-gray-50 border border-gray-100 p-2 rounded-full text-xl"
        />

        <div className="flex items-center space-x-2">
          <h4 className="font-medium hidden  lg:block">{user.name}</h4>
          <DropDown />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
