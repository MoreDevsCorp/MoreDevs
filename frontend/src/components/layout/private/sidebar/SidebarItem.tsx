import { Link } from "react-router-dom";

import { Dispatch, SetStateAction } from "react";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../../../state/userSlice/userSlice";

interface SideBarItemProps {
  title: string;
  Icon: any;
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

const SidebarItem = ({ Icon, title, setActive, active }: SideBarItemProps) => {
  // const user = useSelector(selectUser);

  const url = title.toLocaleLowerCase();
  return (
    <Link to={url} onClick={() => setActive(url)}>
      <li
        className={`w-full    cursor-pointer   py-3  flex items-center space-x-7
        ${active == url ? "font-bold" : "font-medium"}
          hover:opacity-75 transition-all ease-out `}
      >
        {/* <FontAwesomeIcon icon={Icon} /> */}

        <Icon
          active={active == url}
          className="w-6 h-6"
          strokeWidth={active == url ? 2 : 1.5}
        />
        <p className=" text-lg">{title}</p>
      </li>
    </Link>
  );
};

export default SidebarItem;
