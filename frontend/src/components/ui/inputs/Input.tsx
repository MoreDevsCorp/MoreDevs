import { FC } from "react";
import { IconType } from "react-icons/lib";

interface InputProps {
  Icon?: IconType;
  placeHolder?: string;
  value?: string;
  onChange?: (e: any) => void;
}

const Input = ({ Icon, placeHolder, value, onChange }: InputProps) => {
  return (
    <div className="relative flex items-center ">
      {Icon && <Icon className="absolute ml-2 text-gray-500" />}
      <input
        onChange={onChange}
        value={value}
        type="text"
        placeholder={placeHolder}
        className={`${
          Icon ? "pl-8" : "pl-4"
        } pr-3  py-2 w-[100%] text-sm bg-white placeholder-gray-500 rounded border outline-none`}
      />
    </div>
  );
};

export default Input;
