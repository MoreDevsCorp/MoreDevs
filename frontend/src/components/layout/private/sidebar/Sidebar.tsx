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

const SideBar = ({ isSideBarOpen }: SideBar) => {
  const router = useLocation();

  const { pathname } = router;
  const [active, setActive] = useState("Home");

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <div
      className={`absolute z-50 lg:relative max-w-[250px] p-5 w-[100%] h-full space-y-10 opacity-100 transition-all -translate-x-[100%] lg:-translate-x-0  ${
        !isSideBarOpen && " translate-x-0 "
      }   border border-l-0 bg-white border-gray-100 flex flex-col `}
    >
      <h1 className="font-semibold tracking-tight text-3xl text-black-900 text-left">
        MoreDevs.
      </h1>

      <ul className="w-full">
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
  );
};

export default SideBar;
