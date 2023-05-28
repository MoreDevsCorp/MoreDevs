interface ButtonProps {
  type?: "submit" | "button";
  name?: string;
  outline?: boolean;
  onClick?: () => void;
  size?: string;
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  size,
  outline,
  children,
  hover,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={` ${className} border-[1px] transition-all duration-300 rounded font-medium text-sm px-5 py-2  border-zinc ${
        size && size
      }  ${
        outline
          ? `bg-white text-zinc-400  hover:text-black  `
          : `bg-black text-white ${
              hover && "hover:bg-transparent hover:text-black"
            }`
      } hover:border-black shadow-md hover:shadow-lg `}
    >
      {children}
    </button>
  );
};
export default Button;
