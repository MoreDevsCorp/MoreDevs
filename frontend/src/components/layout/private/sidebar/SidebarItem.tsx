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
        className={`w-full px-8  cursor-pointer   py-2.5  flex items-center space-x-2
        ${active == url ? "text-black-900 bg-black-100" : "text-black-500"}
          hover:text-black-600 transition-all ease-out `}
      >
        <FontAwesomeIcon icon={Icon} />
        <p className="font-mediumtext-[13px]">{title}</p>
      </li>
    </Link>
  );
};

export default SidebarItem;
