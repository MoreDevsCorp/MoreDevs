import SidebarItem from "./SidebarItem";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


import {
  MegaphoneIcon,
  HomeIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { text: "Home", icon: HomeIcon },
  { text: "Messages", icon: ChatBubbleBottomCenterTextIcon },
  { text: "Network", icon: UserGroupIcon },
  { text: "Jobs", icon: MegaphoneIcon },
  { text: "Marketplace", icon: BuildingStorefrontIcon },
  { text: "Company", icon: BuildingOfficeIcon },
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
              key={link.text}
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
