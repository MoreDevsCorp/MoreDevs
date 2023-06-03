import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

interface SideBarItemProps {
  title: string;
  Icon: any;
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

const SidebarItem = ({ Icon, title, setActive, active }: SideBarItemProps) => {
  const url = title.toLocaleLowerCase();
  return (
    <Link to={`/${url}`} onClick={() => setActive(url)}>
      <li
        className={`w-full px-8   cursor-pointer   py-3  flex items-center space-x-7
        ${active == url ? "font-bold" : "font-medium"}
          hover:opacity-75 transition-all ease-out `}
      >
        {/* <FontAwesomeIcon icon={Icon} /> */}

        <Icon active={active == url} />
        <p className=" text-lg">{title}</p>
      </li>
    </Link>
  );
};

export default SidebarItem;
