import SidebarItem from "./SidebarItem";

import {
  faHouse,
  faNetworkWired,
  faBriefcase,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

import {
  OutlineChat,
  OutlineCompany,
  OutlineHome,
  OutlineMarketPlace,
  OutlineNetwork,
  OutlineWorkBag,
} from "./Icons";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const navItems = [
  { text: "Home", icon: OutlineHome },
  { text: "Messages", icon: OutlineChat },
  { text: "Network", icon: OutlineNetwork },
  { text: "Jobs", icon: OutlineWorkBag },
  { text: "Marketplace", icon: OutlineMarketPlace },
  { text: "Company", icon: OutlineCompany },
];

interface SideBar {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (value: boolean) => void;
}

const SideBar = ({ isSideBarOpen, setIsSideBarOpen }: SideBar) => {
  const router = useLocation();

  const { pathname } = router;
  const [active, setActive] = useState("Home");

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <div
      className={` lg:block  h-full max-w-[250px] ${isSideBarOpen || "block"} `}
    >
      <div
        className={` fixed w-[100%] max-w-[250px] h-full ${
          isSideBarOpen || "block"
        }`}
      >
        <div
          className={`py-5 w-[100%] h-full space-y-5 opacity-100 lg:block transition-all  bg-white border border-gray-100  flex flex-col  ${
            isSideBarOpen && "hidden"
          }`}
        >
          <h1 className="font-semibold tracking-tight text-3xl text-black-900 text-center">
            MoreDevs.
          </h1>

          <ul className="w-full ">
            {navItems.map((link) => {
              return (
                <SidebarItem
                  setActive={setActive}
                  active={active}
                  title={link.text}
                  Icon={link.icon}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
