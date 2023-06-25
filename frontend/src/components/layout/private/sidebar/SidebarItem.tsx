import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface SideBarItemProps {
  title: string;
  Icon: any;
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

const SidebarItem = ({ Icon, title, setActive, active }: SideBarItemProps) => {
  const user = useSelector((state: RootState) => state.userLogin.userInfo);

  const url = title.toLocaleLowerCase();
  return (
    <Link to={url} onClick={() => setActive(url)}>
      <li
        className={`w-full    cursor-pointer   py-3  flex items-center space-x-7
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
